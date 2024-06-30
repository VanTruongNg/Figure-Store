package com.JewelleryStore.main.controller.user;

import com.JewelleryStore.main.model.Cart;
import com.JewelleryStore.main.model.DTO.CartProductDTO;
import com.JewelleryStore.main.model.Product;
import com.JewelleryStore.main.model.User;
import com.JewelleryStore.main.service.CartService;
import com.JewelleryStore.main.service.ProductService;
import com.JewelleryStore.main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user/cart")
public class CartController {

    private final CartService cartService;
    private final UserService userService;
    private final ProductService productService;

    @Autowired
    public CartController(CartService cartService, UserService userService, ProductService productService) {
        this.cartService = cartService;
        this.userService = userService;
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<Cart> getOrCreateCart (Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        Optional<User> optionalUser = userService.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Optional<Cart> optionalCart = cartService.getCartByUser(user);
            Cart cart = optionalCart.orElseGet(() -> cartService.addCart(user));
            return ResponseEntity.ok(cart);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{cartId}/products")
    public ResponseEntity<Cart> addProductToCart (@PathVariable UUID cartId, @RequestBody CartProductDTO cartProductDTO) {
        Optional<Product> optionalProduct = productService.getProductById(cartProductDTO.getProductId());
        if (optionalProduct.isPresent()) {
            Cart cart = cartService.addProductToCart(cartId, optionalProduct.get(), cartProductDTO.getQuantity());
            if (cart != null) {
                return ResponseEntity.ok(cart);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{cartId}/products/{itemId}")
    public ResponseEntity<Cart> updateProductInCart (@PathVariable UUID cartId, @PathVariable Long itemId, @RequestBody CartProductDTO cartProductDTO) {
        Cart cart = cartService.updateProductInCart(cartId, itemId, cartProductDTO.getQuantity());
        if (cart != null) {
            return ResponseEntity.ok(cart);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{cartId}/products/{itemId}")
    public ResponseEntity<String> removeProductFromCart (@PathVariable UUID cartId, @PathVariable Long itemId) {
        cartService.removeProductFromCart(cartId, itemId);
        return ResponseEntity.ok("Xoá thành công");
    }
}
