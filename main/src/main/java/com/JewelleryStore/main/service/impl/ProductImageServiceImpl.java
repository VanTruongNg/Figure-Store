package com.JewelleryStore.main.service.impl;

import com.JewelleryStore.main.model.ProductImage;
import com.JewelleryStore.main.repository.ProductImageRepository;
import com.JewelleryStore.main.service.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductImageServiceImpl implements ProductImageService {
    private final ProductImageRepository productImageRepository;

    @Autowired
    public ProductImageServiceImpl (ProductImageRepository productImageRepository) {
        this.productImageRepository = productImageRepository;
    }

    @Override
    public ProductImage createProductImage(ProductImage productImage) {
        return productImageRepository.save(productImage);
    }
}
