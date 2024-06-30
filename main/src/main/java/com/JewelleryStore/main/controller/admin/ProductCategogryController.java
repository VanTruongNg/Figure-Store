package com.JewelleryStore.main.controller.admin;

import com.JewelleryStore.main.model.DTO.ProductCategoryDTO;
import com.JewelleryStore.main.model.ProductCategory;
import com.JewelleryStore.main.repository.ProductCategoryRepository;
import com.JewelleryStore.main.service.FileStorageService;
import com.JewelleryStore.main.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/product-categories")
public class ProductCategogryController {

    private final ProductCategoryService productCategoryService;

    @Autowired
    public ProductCategogryController (ProductCategoryService productCategoryService) {
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

    @PostMapping
    public ResponseEntity<ProductCategory> createProductCategory(@RequestParam("name") String name){
            ProductCategory productCategory = new ProductCategory();
            productCategory.setName(name);
            ProductCategory createdProductCategory = productCategoryService.createProductCategory(productCategory);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProductCategory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductCategory> updateProductCategory (@PathVariable UUID id, @RequestBody ProductCategoryDTO productCategoryDTO) {
        Optional<ProductCategory> updatedProductCategory = productCategoryService.updateProductCategory(id, productCategoryDTO);
        return updatedProductCategory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> updateProductCategory (@PathVariable UUID id) {
        boolean isDeleted = productCategoryService.deleteProductCategory(id);
        if (!isDeleted){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Category đã được xoá thành công");
    }
}
