package com.JewelleryStore.main.service.impl;

import com.JewelleryStore.main.model.Product;
import com.JewelleryStore.main.repository.ProductRepository;
import com.JewelleryStore.main.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    private ProductServiceImpl(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(UUID id) {
        return productRepository.findById(id);
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Optional<Product> updateProduct(UUID id, Product product) {
        if (!productRepository.existsById(id)){
            return Optional.empty();
        }

        product.setId(id);
        Product updatedProduct = productRepository.save(product);
        return Optional.of(updatedProduct);
    }

    @Override
    public boolean deleteProduct(UUID id) {
        if (!productRepository.existsById(id)) {
            return false;
        }
        productRepository.deleteById(id);
        return true;
    }
}
