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
        OrderServices.getAllOrders().then((res) => {
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
                            <td>Order #</td>
                            <td>Assigned To</td>    
                            <td>Customer Id</td>
                            <td>Order Details</td>
                            <td>Taken By</td>
                            <td>Taken Time</td>
                            <td>Status</td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.orders.map(
                                order =>                                    
                                <tr key= {order.orderId}>
                                    <td> {order.orderId}</td>
                                    <td> {order.assignedTo}</td>
                                    <td> {order.customerId}</td>
                                    <td> {order.orderDetails}</td>
                                    <td> {order.orderTakenBy}</td>
                                    <td> {order.orderTakenTime}</td>
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