import Button from "./Button";
import React, { useState } from "react";
import OrderServices from "../service/Order-Services";
import CustomerServices from "../service/Customer-Services";
import userEvent from "@testing-library/user-event";
import Order from "./Order";
const OrderHistoryComponent = ({orderHistory}) => {

    return(
        <table className="table table-striped">
            <div>
                {orderHistory.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.dueDate}</td>
                            <td>{order.orderDetails}</td>
                        </tr>
                   
                ))}
            </div>
        </table>
    )
    
}

export default OrderHistoryComponent