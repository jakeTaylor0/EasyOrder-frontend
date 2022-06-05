import axios from 'axios'

const order_getAllOrders_uri = "http://localhost:8080/order-services/allOrders" 
const order_addOrder_uri = "http://localhost:8080/order-services/saveOrder"
class OrderServices{

    getOrders(){
       return axios.get(order_getAllOrders_uri);
    }

    addOrder(Order){
        axios({
            method: 'POST',
            url: order_addOrder_uri,
            data: JSON.stringify(orderDetails)
        });
    }
}

export default new OrderServices()