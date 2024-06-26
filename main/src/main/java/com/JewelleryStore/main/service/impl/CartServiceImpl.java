package com.JewelleryStore.main.service.impl;

import com.JewelleryStore.main.model.Cart;
import com.JewelleryStore.main.model.CartItem;
import com.JewelleryStore.main.model.Product;
import com.JewelleryStore.main.model.User;
import com.JewelleryStore.main.repository.CartRepository;
import com.JewelleryStore.main.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public Cart addCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public Optional<Cart> getCartByUser(User user) {
        return cartRepository.findByUser(user);
    }

    @Override
    public Cart addProductToCart(UUID cartId, Product product, int quantity) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isPresent()){
            Cart cart = optionalCart.get();
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cart.getItems().add(cartItem);
            cartRepository.save(cart);
            return cart;
        }
        return null;
    }

    @Override
    public Cart updateProductInCart(UUID cartId, Long itemId, int quantity) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isPresent()){
            Cart cart = optionalCart.get();
            List<CartItem> items = cart.getItems();
            for (CartItem item: items) {
                if (item.getId().equals(itemId)){
                    item.setQuantity(quantity);
                    cartRepository.save(cart);
                    return cart;
                }
            }
        }
        return null;
    }

    @Override
    public void removeProductFromCart(UUID cartId, Long itemId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            List<CartItem> items = cart.getItems();
            items.removeIf(item -> item.getId().equals(itemId));
            cartRepository.save(cart);
        }
    }
}
