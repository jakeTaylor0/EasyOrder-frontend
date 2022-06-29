import Button from "./Button";
import React, { useState } from "react";
import OrderServices from "../service/Order-Services";
import CustomerServices from "../service/Customer-Services";
import userEvent from "@testing-library/user-event";
import Order from "./Order";
const OrderHistoryComponent = ({orderHistory}) => {

    return(
        <div>
            {orderHistory.map((order, index) => (
                <Order 
                    key={index} 
                    order={order}
                />
            ))}
        </div>
    )
    
}

export default OrderHistoryComponent