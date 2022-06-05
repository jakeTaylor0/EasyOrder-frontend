import { Axios } from "axios";
import { useState } from "react";
import { useEffect } from "react/cjs/react.production.min";
import CustomerServices from "../service/Customer-Services";
const CreateOrder = () => {
    const [id, setId] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const customer = {phone, name};

        
        fetch('http://localhost:8080/customer-services/saveCustomer', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer)
          }).then(response => response.json())
            .then(data => {
                setId(data.id)
                console.log("Customer Added ID: " + data.id)
            });
          
    }

    return (
        <div id="creatOrder">
            <h1>Create Order</h1>
            <form onSubmit={handleSubmit}>
            <div id="customerDetails">
            <label>Phone:</label>
                <input 
                    type="text"
                    required
                    placeholder="Customer Phone #"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                
                <label>Name:</label>
                <input 
                    type="text"
                    required
                    placeholder="Customer Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            
               

                <button>Place Order</button>
            </form>
        </div>
    );
}
export default CreateOrder;