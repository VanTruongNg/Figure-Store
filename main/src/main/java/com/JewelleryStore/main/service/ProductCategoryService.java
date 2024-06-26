package com.JewelleryStore.main.service;

import com.JewelleryStore.main.model.DTO.ProductCategoryDTO;
import com.JewelleryStore.main.model.ProductCategory;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductCategoryService {
    List<ProductCategory> getAllProductCategories();
    Optional<ProductCategory> getProductCategoriesById (UUID id);
    ProductCategory createProductCategory(ProductCategory productCategory);
    Optional<ProductCategory> updateProductCategory (UUID id, ProductCategoryDTO updateDTO);
    boolean deleteProductCategory (UUID id);
}
