import React from 'react';
import CustomerServices from '../service/Customer-Services';

class CustomerComponent extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            customers:[]
        }
    }

    // calls the rest endpoint
    componentDidMount(){
        CustomerServices.getCustomers().then((res) => {
            this.setState({customers: res.data})
        });
    }

    render (){
        return(
            <div>
                <h1 className="text-center">Customer List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>CID</td>
                            <td>Name</td>
                            <td>Phone</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.customers.map(
                                customer =>
                                <tr key= {customer.id}>
                                    <td> {customer.id}</td>
                                    <td> {customer.name}</td>
                                    <td> {customer.phone}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CustomerComponent;