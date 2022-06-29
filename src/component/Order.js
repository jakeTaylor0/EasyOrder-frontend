const Order = ({order}) => {
    return(
        <div>
            {order.orderId}
            {order.orderDetails}
            {order.orderTakenTime}
        </div>
    )
}
export default Order