package com.JewelleryStore.main.service.impl;

import com.JewelleryStore.main.model.DTO.ProductCategoryDTO;
import com.JewelleryStore.main.model.ProductCategory;
import com.JewelleryStore.main.repository.ProductCategoryRepository;
import com.JewelleryStore.main.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;

    @Autowired
    public ProductCategoryServiceImpl (ProductCategoryRepository productCategoryRepository){
        this.productCategoryRepository = productCategoryRepository;
    }

    @Override
    public List<ProductCategory> getAllProductCategories() {
        return productCategoryRepository.findAll();
    }

    @Override
    public Optional<ProductCategory> getProductCategoriesById(UUID id) {
        return productCategoryRepository.findById(id);
    }

    @Override
    public ProductCategory createProductCategory(ProductCategory productCategory) {
        return productCategoryRepository.save(productCategory);
    }

    @Override
    public Optional<ProductCategory> updateProductCategory(UUID id, ProductCategoryDTO updateDTO) {
        return productCategoryRepository.findById(id).map(existingCategory -> {
            if (updateDTO.getName() != null){
                existingCategory.setName(updateDTO.getName());
            }
            return productCategoryRepository.save(existingCategory);
        });
    }

    @Override
    public boolean deleteProductCategory(UUID id) {
        if (!productCategoryRepository.existsById(id)){
            return false;
        }
        productCategoryRepository.deleteById(id);
        return true;
    }
}
