package com.JewelleryStore.main.service;

import com.JewelleryStore.main.model.User;

import java.util.Optional;
import java.util.UUID;

public interface UserService {
    Optional<User> findByEmail(String email);
    Optional<User> findById(UUID id);
    User save(User user);
    User updateUserDetails(User user, String firstname, String lastname, String phoneNumber);
    User updateProfileImage(User user, String profileImage);
    User changePassword(User user, String newPassword);
    boolean checkPassword(User user, String oldPassword);
}
