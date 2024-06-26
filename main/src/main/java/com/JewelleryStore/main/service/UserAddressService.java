package com.JewelleryStore.main.service;

import com.JewelleryStore.main.model.User;
import com.JewelleryStore.main.model.UserAddress;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserAddressService {
    Optional<UserAddress> findById(UUID id);
    List<UserAddress> findByUser(User user);
    UserAddress save(UserAddress userAddress);
    void deleteById(UUID id);
}
