import axios from 'axios'

const order_getAllOrders_uri = "http://localhost:8080/order-services/allOrders" 
const order_addOrder_uri = "http://localhost:8080/order-services/saveOrder"
const order_orderHistory_uri = "http://localhost:8080/order-services/orderHistory?customerId="
class OrderServices{

    getAllOrders(){
       return axios.get(order_getAllOrders_uri);
    }

    getOrderHistory(customerId){
        return axios.get(order_orderHistory_uri + customerId);
    }

    addOrder(order){
        return axios({
            method: 'POST',
            url: order_addOrder_uri,
            data: order
        });
    }
}

export default new OrderServices()