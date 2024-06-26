package com.JewelleryStore.main.service.impl;

import com.JewelleryStore.main.model.User;
import com.JewelleryStore.main.model.UserAddress;
import com.JewelleryStore.main.repository.UserAddressRepository;
import com.JewelleryStore.main.service.UserAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserAddressServiceImpl implements UserAddressService {
    private final UserAddressRepository userAddressRepository;

    @Autowired
    public UserAddressServiceImpl (UserAddressRepository userAddressRepository){
        this.userAddressRepository = userAddressRepository;
    }

    @Override
    public Optional<UserAddress> findById(UUID id) {
        return userAddressRepository.findById(id);
    }

    @Override
    public List<UserAddress> findByUser(User user) {
        return userAddressRepository.findByUser(user);
    }

    @Override
    public UserAddress save(UserAddress userAddress) {
        return userAddressRepository.save(userAddress);
    }

    @Override
    public void deleteById(UUID id) {
        userAddressRepository.deleteById(id);
    }
}
