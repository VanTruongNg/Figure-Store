package com.JewelleryStore.main.repository;

import com.JewelleryStore.main.model.User;
import com.JewelleryStore.main.model.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserAddressRepository extends JpaRepository<UserAddress, UUID> {
    List<UserAddress> findByUser(User user);
}
