import React, { Component } from 'react';
import ProductService from '../services/ProductService';


class UpdateProductComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            sku: this.props.match.params.sku,
            productName: '',
            createDate: ''
        }

        this.changeSkuHandler = this.changeSkuHandler.bind(this);
        this.changeProductNameHandler = this.changeProductNameHandler.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
    }

        componentDidMount(){
            ProductService.getProductBySku(this.state.sku).then((res) =>{
            let product = res.data;
            this.setState({createDate: product.createDate,
                productName: product.productName,
                sku: product.productSku                
                });
        });
    }

    updateProduct = (e) => {
        e.preventDefault();
        let product = {sku: this.state.sku, productName: this.state.productName, createDate: this.state.createDate};
        console.log('product => ' + JSON.stringify(product));
        ProductService.updateProduct(product, this.state.sku).then( res => {
            this.props.history.push('/products');
        });

    }

       
    changeSkuHandler= (event) => {
        this.setState({sku: event.target.value});
    }

    changeProductNameHandler= (event) => {
        this.setState({productName: event.target.value});
    }

    changeCreateDate= (event) => {
        this.setState({createDate: event.target.value});
    }

    cancel(){
        this.props.history.push('/products');
    }

    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className = "text-center">Update Book
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                                <label> Book SKU: </label>
                                                <input placeholder="Book SKU#" name="sku" className="form-control" 
                                                    value={this.state.sku} onChange={this.changeSkuHandler}/>
                                        </div>
                                        <div className = "form-group">
                                                <label> Book Title: </label>
                                                <input placeholder="Book Title" name="productName" className="form-control" 
                                                    value={this.state.productName} onChange={this.changeProductNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                                <label> Published Date: </label>
                                                <input placeholder="Published Date" name="createDate" className="form-control" 
                                                    value={this.state.createDate} onChange={this.changeCreateDate}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateProduct}>Save Book</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}} >Cancel</button>
                                    </form>

                                </div>
                            </h3>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default UpdateProductComponent;