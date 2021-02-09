import React, { Component } from 'react';
import ProductService from '../services/ProductService';

class CreateProductComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            // step 2
            sku: this.props.match.params.sku,
            productName: '',
            createDate: ''
        }

        this.changeSkuHandler = this.changeSkuHandler.bind(this);
        this.changeProductNameHandler = this.changeProductNameHandler.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
    }
    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id == -1){
            return
        } else {
            ProductService.getProductBySku(this.state.sku).then((res) =>{
                let product = res.data;
                this.setState({createDate: product.createDate,
                    productName: product.productName,
                    sku: product.productSku                
                    });
                });
        }
    }

    saveProduct = (e) => {
        e.preventDefault();
        let product = {sku: this.state.sku, productName: this.state.productName, createDate: this.state.createDate};
        console.log('product => ' + JSON.stringify(product));

        if(this.state.id == -1){
            
        ProductService.createProduct(product).then(res => {
            this.props.history.push('/products');
        });
        } else {
            ProductService.updateProduct(product, this.state.sku).then( res => {
                this.props.history.push('/products');
            });
    }}
    
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

    getTitle(){
        if(this.state.sku == -1){
            return <h3 className = "text-center">Add Book</h3>
        } else {
            return <h3 className = "text-center">Update Book</h3>
        }
    }
    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                                }
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

                                        <button className="btn btn-success" onClick={this.saveProduct}>Save Book</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}} >Cancel</button>
                                    </form>

                                </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default CreateProductComponent;