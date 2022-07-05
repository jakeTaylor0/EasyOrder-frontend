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
    const [orderDueTime, setOrderDueTime] = useState('');
    const [orderDetails, setOrderDetails] = useState('');
    const [orderHistory, setOrderHistory] = useState([]);
    const [customerExsists, setCustomerExsists] = useState(false);
    const [disabledOH, setDisabledOH] = useState(true);

    const customerSearch = (phone) => {
        CustomerServices.getCustomersByPhone(phone).then((res) => {
            if(res.data.responseCode !== '404'){
                setCustomerId(res.data.responseData.customerId);
                setCustomerName(res.data.responseData.name);
                setCustomerExsists(true);
                console.log("Customer with phone: " + customerPhone + " found.")
                OrderServices.getOrderHistory(res.data.responseData.customerId).then((res) => {
                    if(res.data.responseData.length > 0)
                        setDisabledOH(false);
                    else
                        setDisabledOH(true);
                });
            }

            else
                console.log("No customer data found for phone.");
            
        });
    }

    const getOrderHistory = () => {
        OrderServices.getOrderHistory(customerId).then((res) => {
            if(res.data.responseData.length > 0){
                console.log("Order history found for customer.");
                setOrderHistory(res.data.responseData);
            }
            else
                console.log("No order history found for customer.")
        });
    }

    const placeOrder = () =>{
        if(customerExsists === true){
            CustomerServices.getCustomersByPhone(customerPhone).then((res) => {
                if(res.data.responseData !== null){
                    if(customerName !== res.data.responseData.name){
                       const customer = {name: customerName, phone: customerPhone};
                       CustomerServices.saveCustomer(customer).then((res) => {
                            setCustomerId(res.data.responseData.customerId);
                            console.log("Customer with id: " + res.data.responseData.customerId + " updated.");
                        });
                    }
                }

            });
        }
        else{
            const customer = {name: customerName, phone: customerPhone};
            CustomerServices.saveCustomer(customer).then((res) => {
                console.log("New customer saved with id: " + res.data.responseData.customerId + ".")
                setCustomerId(res.data.responseData.customerId);
             });
        }

        const order = {customerId: customerId, orderDetails: orderDetails, dueDate: orderDueDate, orderTakenBy: '', assingedTo: '', status:'NEW'};
        OrderServices.addOrder(order).then((res) =>{
            console.log("Order Saved Successfully.")
                
        });
    }
    return(
        <div>
            
                <div id="placeOrder" style={{borderColor:"#D3D3D3", borderStyle:"solid", borderRadius:"4px", width:"500px"}}>
                    <h1>Create Order</h1>
                    <div style={{float:"left"}}>
                        <label>Phone:</label>
                        <input 
                            type="text"
                            id="phone"
                            required
                            placeholder="Phone"
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
                    </div>
                    
                    <label>Name:</label>
                    <input 
                        type="text"
                        id="name"
                        required
                        placeholder="Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <div style={{float:"left"}}>
                        <label>Pickup Date:</label>
                            <input 
                                type="date" 
                                id="date" 
                                required
                                name="trip-start"
                                value = {orderDueDate}
                                onChange={(e) => setOrderDueDate(e.target.value)}  
                                //min="2018-01-01" max="2018-12-31"
                            />
                    </div>
                    
                    <label>Pickup Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={orderDueTime}
                        onChange={(e) => setOrderDueTime(e.target.value)}

                    />
                    <textarea name="orderDetails"
                        type="textarea"
                        required
                        id="itemList"
                        value={orderDetails}
                        onChange={(e) => setOrderDetails(e.target.value)}
                    />

                    <div style={{float:""}}>
                        <Button 
                            bgColor={'red'}
                            text={'Order History'}
                            onClick={(e) => getOrderHistory()}
                            isDisabled={disabledOH}
                        />
                    </div>
                </div>

                
               
       


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