import Button from "./Button";
import React, { useState } from "react";
import OrderServices from "../service/Order-Services";
import CustomerServices from "../service/Customer-Services";
import userEvent from "@testing-library/user-event";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import OrderHistoryComponent from "./OrderHistory-Component";
const CreateOrderComponent = () => {

    const [order, setOrder] = useState([]);
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
                console.log("Customer found.");
                OrderServices.getOrderHistory(res.data.responseData.customerId).then((res) => {
                    if(res.data.responseData.length > 0){
                        console.log("Order history found for customer.");
                        setDisabledOH(false);
                    }
                    else{
                        console.log("Order history not found for customer.");
                        setDisabledOH(true);
                    }
                });
            }
            else
                console.log("Customer not found.");
            
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

    const placeOrder = () => {
        // check to see if customer exsists
        if(customerExsists === false){
            // save customer
            const customer = {name: customerName, phone: customerPhone};
            CustomerServices.saveCustomer(customer).then((res) => {
                console.log("New customer details saved.");
                
                // save order
                const order = {customerId: res.data.responseData.customerId, orderDetails: orderDetails, dueDate: orderDueDate + "T" + orderDueTime, orderTakenBy: "", assignedTo: "", status: "NEW"};
                OrderServices.addOrder(order).then((res2) => {
                    console.log("Order saved.");
                });
            });
        }
        else{
            // check if customer's name has been updated
            CustomerServices.getCustomersByPhone(customerPhone).then((res1) => {
                if(customerName !== res1.data.responseData.name){ 
                    // update customer
                    const customer = {name: customerName, phone: customerPhone};
                    CustomerServices.saveCustomer(customer).then((res2) => {
                        console.log("Customer name updated.");

                        // save order
                        const order = {customerId: res2.data.responseData.customerId, orderDetails: orderDetails, dueDate: orderDueDate + "T" + orderDueTime, orderTakenBy: "", assignedTo: "", status: "NEW"};
                        OrderServices.addOrder(order).then((res3) => {
                            console.log("Order saved.");
                        });
                    });
                }
                else{
                    // customer exsists and no changes to name were made
                    // save order
                    const order = {customerId: customerId, orderDetails: orderDetails, dueDate: orderDueDate + "T" + orderDueTime, orderTakenBy: "", assignedTo: "", status: "NEW"};
                        OrderServices.addOrder(order).then((res3) => {
                            console.log("Order saved.");
                        });
                }
            });
        } 
    }
    return(
        <div>
            
                <div id="placeOrder" style={{borderColor:"#D3D3D3", borderStyle:"solid", borderRadius:"4px"}}>
                    <h1>Create Order</h1>
                    <div style={{flexDirection: 'column'}}>
                        <label>Phone:</label>
                        <PhoneInput 
                            country={'us'}
                            id="phone"
                            required
                            value={customerPhone}
                            onChange={(e) => {
                                setCustomerPhone(e);

                                if(e.length >= 11)
                                    customerSearch(e);
                                else{
                                    setCustomerId('');
                                    setCustomerName('');
                                    setDisabledOH(true);
                                }
                            }}
                        />
                    </div>
                    <div style={{float:"none"}}>
                    <label>Name:</label>
                    <input 
                        type="text"
                        id="name"
                        required
                        placeholder="Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                    </div>
                    
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
                    <div style={{flexDirection: 'column'}}>
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