package com.JewelleryStore.main.controller.admin;

import com.JewelleryStore.main.model.Product;
import com.JewelleryStore.main.model.ProductImage;
import com.JewelleryStore.main.service.FileStorageService;
import com.JewelleryStore.main.service.ProductImageService;
import com.JewelleryStore.main.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/product-images")
public class ProductImageController {
    private final ProductImageService productImageService;
    private final FileStorageService fileStorageService;
    private final ProductService productService;

    @Autowired
    public ProductImageController (ProductImageService productImageService,
                                   FileStorageService fileStorageService,
                                   ProductService productService){
        this.productImageService = productImageService;
        this.fileStorageService = fileStorageService;
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<ProductImage> createProductImage (@RequestParam("productId") UUID name,
                                                            @RequestParam("image")MultipartFile image){
        Optional<Product> existingProduct = productService.getProductById(name);
        if (existingProduct.isPresent()){
            try {
                String imageUrl = fileStorageService.storeFile(image);
                ProductImage productImage = new ProductImage();
                productImage.setProduct(existingProduct.get());
                productImage.setUrl(imageUrl);
                ProductImage createdProductImage = productImageService.createProductImage(productImage);
                return ResponseEntity.status(HttpStatus.CREATED).body(createdProductImage);
            }catch (IOException ex){
                ex.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
