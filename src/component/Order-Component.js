import React from 'react';
import OrderServices from '../service/Order-Services';

class OrderComponent extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            orders:[]
        }
    }

    // calls the rest endpoint
    componentDidMount(){
        OrderServices.getOrders().then((res) => {
            this.setState({orders: res.data})
        });
    }

    render (){
        return(
            <div>
                <h1 className="text-center">Order List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>OID</td>
                            <td>CID</td>
                            <td>Order Details</td>
                            <td>Due Date</td>
                            <td>Taken By</td>
                            <td>Assigned To</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.orders.map(
                                order =>
                                <tr key= {order.id}>
                                    <td> {order.customerId}</td>
                                    <td> {order.orderDetails}</td>
                                    <td> {order.dueDate}</td>
                                    <td> {order.orderTakenBy}</td>
                                    <td> {order.assignedTo}</td>
                                    <td> {order.status}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default OrderComponent;