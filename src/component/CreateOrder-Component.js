import { useState } from "react";

const CreateOrder = () => {
    const [customerId, setCustomerId] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [order, setOrder] = useState('');
    const [date, setDate] = useState('');
    const orderDetails = [];
    const handleSubmit = (e) => {
        e.preventDefault();
        const customer = {phone, name};
        
    }
    //setDate(new Date(this).getDate())
    const serachForCustomerByPhone = (e) => {
        fetch('http://localhost:8080/customer-services/getCustomerByPhone?phone=' + e, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
            }).then(response => response.json())
            .then(data => {
                if(data != "No data found."){
                    setCustomerId(data.customerId);
                    setName(data.name);
                    console.log("Customer Data Retrieved: " + data.name)
                }
                else
                    console.log("No data found for phone number: " + e);
           
        });
    }

    const orderHistory = (e) => {
        fetch('http://localhost:8080/order-services/orderHistory?customerId=' + customerId, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
            }).then(response => response.json())
            .then(data => {
                if(data != "No data found."){
                    console.log("Order History Retrieved")
                    console.log(data);
                }
                else
                    console.log("No data found for customer id: " + e);
           
        });
    }

    const itemList = [];
    const input = (e) =>{
        itemList.push(e)
        document.forms.order.orderDetails.value += e+"\n";
    }
  
    return (
        <div id="creatOrder">
            <h1>Create Order</h1>
                <form name = "order">
                    <div id="customerDetails">
                        <label>Phone:</label>
                            <input 
                                type="text"
                                required
                                placeholder="Customer Phone #"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                    if(e.target.value.length == 10)
                                        serachForCustomerByPhone(e.target.value);
                                    else
                                        setName('');
                                }}
                            />
                
                        <label>Name:</label>
                            <input 
                                type="text"
                                required
                                placeholder="Customer Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        <button type="button" onClick={(e) => orderHistory(customerId)}>Order History</button>

                        <label>Pickup Date:</label>
                            <input 
                                type="date" 
                                id="start" 
                                name="trip-start"
                                value = {date}
                                   
                                //min="2018-01-01" max="2018-12-31"
                            />
                    </div>
                    <div>

                    </div>
                    <div>
                        <textarea name="orderDetails"></textarea>
                    </div>
                

                <button type="submit">Place Order</button>
            </form>
        </div>
    );
}
export default CreateOrder;