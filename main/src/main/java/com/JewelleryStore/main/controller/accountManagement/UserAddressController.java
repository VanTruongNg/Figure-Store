package com.JewelleryStore.main.controller.accountManagement;


import com.JewelleryStore.main.model.User;
import com.JewelleryStore.main.model.UserAddress;
import com.JewelleryStore.main.service.UserAddressService;
import com.JewelleryStore.main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/v1/account/address")
public class UserAddressController {
    private final UserAddressService userAddressService;
    private final UserService userService;

    @Autowired
    public UserAddressController(UserAddressService userAddressService, UserService userService) {
        this.userAddressService = userAddressService;
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAddress> getUserAddressById (@PathVariable UUID id) {
        Optional<UserAddress> userAddress = userAddressService.findById(id);
        return userAddress.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<UserAddress>> getUserAddress (Authentication authentication) {
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        String email = userDetails.getUsername();
        Optional<User> optionalUser = userService.findByEmail(email);

        if (optionalUser.isPresent()){
            User user = optionalUser.get();
            List<UserAddress> userAddresses = userAddressService.findByUser(user);
            return ResponseEntity.ok(userAddresses);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<UserAddress> createUserAddress (Authentication authentication,
                                                          @RequestBody UserAddress userAddress){
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        Optional<User> optionalUser = userService.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            userAddress.setUser(user);
            UserAddress newUserAddress = userAddressService.save(userAddress);
            return ResponseEntity.ok(newUserAddress);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserAddress> updateUserAddress(Authentication authentication, @PathVariable UUID id, @RequestBody UserAddress userAddress) {

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        Optional<User> optionalUser = userService.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            userAddress.setUser(user);
            userAddress.setId(id);
            UserAddress createdUserAddress = userAddressService.save(userAddress);
            return ResponseEntity.ok(createdUserAddress);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserAddress(@PathVariable UUID id) {
        Optional<UserAddress> userAddress = userAddressService.findById(id);
        if(userAddress.isPresent()){
            userAddressService.deleteById(id);
            return ResponseEntity.ok("Xoá địa chỉ thành công");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
