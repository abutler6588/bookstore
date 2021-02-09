package com.bookstore.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.springboot.exception.ResourceNotFoundException;
import com.bookstore.springboot.model.Product;
import com.bookstore.springboot.repository.ProductRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ProductController {
	
	@Autowired
	private ProductRepository productRepository;
		
	// get all products
	
	@GetMapping("/products")
	public List<Product> getAllProducts(){
		return productRepository.findAll();
	}
	
	//create product rest api
	@PostMapping("/products")
	public Product createProduct(@RequestBody Product product) {
		return productRepository.save(product);
	}
	
	//get product by sky rest api
	@GetMapping("/products/{sku}")
	public ResponseEntity<Product> getProductById(@PathVariable Long sku) {
		Product product = productRepository.findById(sku)
				.orElseThrow(() -> new ResourceNotFoundException("Book not found with sku :" + sku));
		return ResponseEntity.ok(product);
	}
	
	//update product rest api
	@PutMapping("/products/{sku}")
	public ResponseEntity<Product> updateProduct(@PathVariable Long sku, @RequestBody Product productDetails){
	
		Product product = productRepository.findById(sku)
				.orElseThrow(() -> new ResourceNotFoundException("Book not found with sku :" + sku));
		
		product.setProductName(productDetails.getProductName());
		product.setCreateDate(productDetails.getCreateDate());
		product.setSku(productDetails.getSku());
		
		Product updatedProduct = productRepository.save(product);
		return ResponseEntity.ok(updatedProduct);
		
	}
	
	//delete product rest api
	@DeleteMapping("/products/{sku}")
	public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable Long sku){
		Product product = productRepository.findById(sku)
				.orElseThrow(() -> new ResourceNotFoundException("Book not found with sku :" + sku));
		
		productRepository.delete(product);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
		
}
