import React, { Component } from 'react';
import ProductService from '../services/ProductService';

class ListProductComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            products: []
        }
        this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    deleteProduct(sku){
        ProductService.deleteProduct(sku).then( res => {
            this.setState({products: this.state.products.filter(product => product.sku !== sku)});
        });
    }

    editProduct(sku){
        this.props.history.push(`/add-product/${sku}`);
    }

    componentDidMount(){
        ProductService.getProducts().then((res) => {
            this.setState({products: res.data});
        });
    }

    addProduct(){
        this.props.history.push('/add-product/-1');
    }
    render() {
        return (
            <div>
               <h2 className="text-center">Marketplace Book List</h2>
               <div className="row">
                   <button className="btn btn-primary" onClick={this.addProduct}>
                       Add Book To Marketplace
                   </button>
               </div>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Book SKU</th>
                                    <th>Book Title</th>
                                    <th>Published Date</th>
                                    <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.products.map(
                                        product =>
                                        <tr key = {product.id}>
                                            <td>{product.sku}</td>
                                            <td>{product.productName}</td>
                                            <td>{product.createDate}</td>
                                            <td>
                                                <button onClick ={ () => this.editProduct(product.sku)} className="btn btn-info">
                                                    Update
                                                </button>
                                                <button style={{marginLeft: "10px"}} onClick ={ () => this.deleteProduct(product.sku)} className="btn btn-danger">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                    </div>
            </div>
        );
    }
}

export default ListProductComponent;