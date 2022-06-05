import axios from 'axios'

const customer_getAllCustomers_uri = 'http://localhost:8080/customer-services/allCustomers';
const customer_saveCustomer_uri = 'http://localhost:8080/customer-services/saveCustomer'
class CustomerServices{

    getCustomers(){
       return axios.get(customer_getAllCustomers_uri);
    }
}

export default new CustomerServices()