import axios from 'axios';

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/products";

class ProductService {

    getProducts(){
        return axios.get(PRODUCT_API_BASE_URL);
    }

    createProduct(product){
        return axios.post(PRODUCT_API_BASE_URL, product);
    }

    getProductBySku(sku){
        return axios.get(PRODUCT_API_BASE_URL + '/' + sku);
    }

    updateProduct(product, sku){
        return axios.put(PRODUCT_API_BASE_URL, '/', sku, product);
    }

    deleteProduct(sku){
        return axios.delete(PRODUCT_API_BASE_URL + '/' + sku);
    } 
}

export default new ProductService()