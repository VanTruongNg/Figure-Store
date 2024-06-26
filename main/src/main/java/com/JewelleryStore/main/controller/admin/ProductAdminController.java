package com.JewelleryStore.main.controller.admin;

import com.JewelleryStore.main.model.DTO.ProductDTO;
import com.JewelleryStore.main.model.Product;
import com.JewelleryStore.main.model.ProductCategory;
import com.JewelleryStore.main.model.ProductImage;
import com.JewelleryStore.main.repository.ProductRepository;
import com.JewelleryStore.main.service.ProductCategoryService;
import com.JewelleryStore.main.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/admin/products")
public class ProductAdminController {

    private final ProductService productService;
    private final ProductCategoryService productCategoryService;

    @Autowired
    public ProductAdminController (ProductService productService, ProductCategoryService productCategoryService){
        this.productService = productService;
        this.productCategoryService = productCategoryService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(){
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById (@PathVariable UUID id){
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> createProduct (@RequestBody ProductDTO productDTO) {
        Optional<ProductCategory> productCategory =
                productCategoryService.getProductCategoriesById(productDTO.getCategory());
        if (productCategory.isPresent()) {
            Product product = new Product();
            product.setName(productDTO.getName());
            product.setPrice(productDTO.getPrice());
            product.setBrand(productDTO.getBrand());
            product.setScale(productDTO.getScale());
            product.setCategory(productCategory.get());
            product.setDescription(productDTO.getDescription());

            Product createProduct = productService.createProduct(product);
            List<ProductImage> images = new ArrayList<>();
            createProduct.setImages(images);
            return ResponseEntity.status(HttpStatus.CREATED).body(createProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct (@PathVariable UUID id, @RequestBody ProductDTO productDTO) {
        Optional<Product> existProduct = productService.getProductById(id);
        if (existProduct.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        Product product = existProduct.get();
        Optional<ProductCategory> productCategory = productCategoryService.getProductCategoriesById(productDTO.getCategory());
        if (productCategory.isPresent()) {
            product.setName(productDTO.getName());
            product.setPrice(productDTO.getPrice());
            product.setBrand(productDTO.getBrand());
            product.setScale(productDTO.getScale());
            product.setDescription(productDTO.getDescription());
            product.setCategory(productCategory.get());
            Optional<Product> updatedProductOptional  = productService.updateProduct(id, product);
            if (updatedProductOptional.isPresent()){
                Product updatedProduct  = updatedProductOptional.get();
                return ResponseEntity.status(HttpStatus.CREATED).body(updatedProduct);
            } else {
                return ResponseEntity.notFound().build();
            }
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        boolean isDeleted = productService.deleteProduct(id);
        if (!isDeleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
