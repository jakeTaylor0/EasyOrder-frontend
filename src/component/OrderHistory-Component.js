import Button from "./Button";
import React, { useState } from "react";
import OrderServices from "../service/Order-Services";
import CustomerServices from "../service/Customer-Services";
import userEvent from "@testing-library/user-event";
import Order from "./Order";
const OrderHistoryComponent = ({orderHistory}) => {

    return(
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <td>Order #</td>
                        <td>Due Date</td>
                        <td>Order Details</td>
                    </tr>
                </thead>

                <tbody>
                    {orderHistory.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.dueDate}</td>
                            <td>{order.orderDetails}</td>
                        </tr>
                    ))}
                </tbody>
      
            </table>
        </div>
    )
    
}

export default OrderHistoryComponent