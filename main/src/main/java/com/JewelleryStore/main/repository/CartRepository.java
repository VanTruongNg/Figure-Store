package com.JewelleryStore.main.repository;

import com.JewelleryStore.main.model.Cart;
import com.JewelleryStore.main.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartRepository extends JpaRepository<Cart, UUID> {
    Optional<Cart> findByUser (User user);
}
