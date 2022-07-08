import Button from "./Button";
import React, { useState } from "react";
import OrderServices from "../service/Order-Services";
import CustomerServices from "../service/Customer-Services";
import userEvent from "@testing-library/user-event";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import OrderHistoryComponent from "./OrderHistory-Component";
const CreateOrderComponent = () => {

    const [order, setOrder] = useState('');
    const [customerId, setCustomerId] = useState(0);
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
                console.log("Customer found.");
                OrderServices.getOrderHistory(res.data.responseData.customerId).then((res) => {
                    if(res.data.responseData.length > 0){
                        console.log("Order history found for customer.");
                        setDisabledOH(false);
                    }
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
                setOrderHistory(res.data.responseData);
            }
            else
                console.log("No order history found for customer.")
        });
    }
    
    const saveCustomer = () => {
        const customer = {name: customerName, phone: customerPhone};
        CustomerServices.saveCustomer(customer).then((res) => {
            console.log("Customer info saved with id: " + res.data.responseData.customerId);
            return res.data.responseData.customerId;
        });
    }
    const placeOrder = () =>{
        var cid = 0;
        if(customerExsists === true){
            CustomerServices.getCustomersByPhone(customerPhone).then((res) => {
                if(res.data.responseData !== null){
                    if(customerName !== res.data.responseData.name){
                       const customer = {name: customerName, phone: customerPhone};
                       CustomerServices.saveCustomer(customer).then((res) => {
                            setCustomerId(res.data.responseData.customerId);
                            cid = res.data.responseData.customerId;
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
                cid = res.data.responseData.customerId;
             });
        }
        console.log(cid);
        const order = {customerId: cid, orderDetails: orderDetails, dueDate: orderDueDate, orderTakenBy: '', assingedTo: '', status:'NEW'};
        OrderServices.addOrder(order).then((res) =>{
            console.log("Order Saved Successfully.")
                
        });
    }
    return(
        <div>
            
                <div id="placeOrder" style={{borderColor:"#D3D3D3", borderStyle:"solid", borderRadius:"4px"}}>
                    <h1>Create Order</h1>
                    <div style={{float:"left"}}>
                        <label>Phone:</label>
                        <PhoneInput 
                            country={'us'}
                            //id="phone"
                            required
                            //placeholder="Phone"
                            value={customerPhone}
                            onChange={(e) => {
                                //console.log(e);
                                setCustomerPhone(e);
                                if(e.length >= 11)
                                    customerSearch(e);
                                else{
                                    setCustomerId(0);
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

                    <div style={{float:"left"}}>
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