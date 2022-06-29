import Button from "./Button";
import React, { useState } from "react";
import OrderServices from "../service/Order-Services";
import CustomerServices from "../service/Customer-Services";
import userEvent from "@testing-library/user-event";
import OrderHistoryComponent from "./OrderHistory-Component";
const CreateOrderComponent = () => {

    const [order, setOrder] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [orderDueDate, setOrderDueDate] = useState('');
    const [orderDetails, setOrderDetails] = useState('');
    const [orderHistory, setOrderHistory] = useState([]);

    const [disabledOH, setDisabledOH] = useState(true);

    const customerSearch = (phone) => {
        CustomerServices.getCustomersByPhone(phone).then((res) => {
            console.log(res.data.responseData);
            if(res.data.responseCode !== '404'){
                setCustomerId(res.data.responseData.customerId);
                setCustomerName(res.data.responseData.name);

                OrderServices.getOrderHistory(res.data.responseData.customerId).then((res) => {
                    if(res.data.responseData.length > 0)
                        setDisabledOH(false);
                    else
                        setDisabledOH(true);
                });
            }

            else
                console.log("No customer data found for phone");
            
        });
    }

    const getOrderHistory = () => {
        OrderServices.getOrderHistory(customerId).then((res) => {
            if(res.data.responseData.length > 0){
                console.log(res.data.responseData);
                setOrderHistory(res.data.responseData);
            }
            else
                console.log("No order history found for customer")
        });
    }

    const placeOrder = () =>{
        const order = {customerId: customerId, orderDetails: '', dueDate: '', orderTakenBy: '', assingedTo: '', status:'NEW'};

        
        OrderServices.addOrder(order).then((res) =>{
            console.log(res.data)
                
        });
    }
    return(
        <div>
            <h1>Create Order</h1>
                <div id="customerDetails">

                    <label>Phone:</label>
                    <input 
                        type="text"
                        required
                        placeholder="Customer Phone #"
                        value={customerPhone}
                        onChange={(e) => {
                            setCustomerPhone(e.target.value);
                            if(e.target.value.length === 10)
                                customerSearch(e.target.value);
                            else{
                                setCustomerId('');
                                setCustomerName('');
                                setDisabledOH(true);
                            }
                                    
                        }}
                    />

                    <label>Name:</label>
                    <input 
                        type="text"
                        required
                        placeholder="Customer Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                    
                </div>

                <Button 
                    bgColor={'red'}
                    text={'Order History'}
                    onClick={(e) => getOrderHistory()}
                    isDisabled={disabledOH}
                />

                <Button 
                    bgColor={'red'}
                    text={'Place Order'}
                    onClick={(e) => placeOrder()}
                    isDisabled={false}
                />

                <OrderHistoryComponent
                    orderHistory={orderHistory}
                />
        </div>
    )
    
}

export default CreateOrderComponent;