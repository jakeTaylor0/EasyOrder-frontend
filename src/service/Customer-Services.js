import axios from 'axios'

const customer_getAllCustomers_uri = 'http://localhost:8080/customer-services/allCustomers'
const customer_getCustomerByPhone_uri = 'http://localhost:8080/customer-services/getCustomerByPhone?phone='
const customer_saveCustomer_uri = 'http://localhost:8080/customer-services/saveCustomer'
class CustomerServices{

    getCustomers(){
       return axios.get(customer_getAllCustomers_uri);
    }

    getCustomersByPhone(phone){
        return axios.get(customer_getCustomerByPhone_uri + phone);
     }
}

export default new CustomerServices()