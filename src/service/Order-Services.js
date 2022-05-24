import axios from 'axios'

const order_getAllOrders_uri = "http://localhost:8080/order-services/allOrders"
class OrderServices{

    getOrders(){
       return axios.get(order_getAllOrders_uri);
    }
}

export default new OrderServices()