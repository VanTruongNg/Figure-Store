package com.JewelleryStore.main.service.impl;

import com.JewelleryStore.main.model.User;
import com.JewelleryStore.main.repository.UserRepository;
import com.JewelleryStore.main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl (UserRepository userRepository, UserDetailsService userDetailsService, PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService= userDetailsService;
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findById(UUID id) {
        return userRepository.findById(id);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUserDetails(User user, String firstname, String lastname, String phoneNumber) {

        user.setFirstName(firstname);
        user.setLastName(lastname);
        user.setPhoneNumber(phoneNumber);

        return userRepository.save(user);
    }

    @Override
    public User updateProfileImage(User user, String profileImage) {

        user.setProfileImage(profileImage);

        return userRepository.save(user);
    }

    @Override
    public User changePassword(User user, String newPassword) {

        user.setPassword(passwordEncoder.encode(newPassword));

        return userRepository.save(user);
    }

    @Override
    public boolean checkPassword(User user, String oldPassword) {

        if (!passwordEncoder.matches(oldPassword, user.getPassword())){
            return false;
        }

        return true;
    }
}
