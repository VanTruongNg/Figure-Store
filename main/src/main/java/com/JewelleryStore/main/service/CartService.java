package com.JewelleryStore.main.service;

import com.JewelleryStore.main.model.Cart;
import com.JewelleryStore.main.model.Product;
import com.JewelleryStore.main.model.User;

import java.util.Optional;
import java.util.UUID;

public interface CartService {
    Cart addCart(User user);
    Optional<Cart> getCartByUser(User user);
    Cart addProductToCart(UUID cartId, Product product, int quantity);
    Cart updateProductInCart(UUID cartId, Long itemId, int quantity);
    void removeProductFromCart(UUID cartId, Long itemId);
}
