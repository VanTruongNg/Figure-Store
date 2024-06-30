package com.JewelleryStore.main.controller.user;

import com.JewelleryStore.main.model.ProductCategory;
import com.JewelleryStore.main.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user/product-categories")
public class CategoryController {
    private final ProductCategoryService productCategoryService;

    @Autowired
    public CategoryController (ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    @GetMapping
    public ResponseEntity<List<ProductCategory>> getAllProductCategory(){
        List<ProductCategory> productCategories =  productCategoryService.getAllProductCategories();
        return ResponseEntity.ok(productCategories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductCategory> getProductCategoryById(@PathVariable UUID id) {
        Optional<ProductCategory> productCategory = productCategoryService.getProductCategoriesById(id);
        return productCategory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
