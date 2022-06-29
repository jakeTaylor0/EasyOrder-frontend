const Order = ({order}) => {
    return(
        <div>
            {order.orderId}
            {order.orderDetails}
            {order.orderTakenTime}
            {order.dueDate}
        </div>
    )
}
export default Order