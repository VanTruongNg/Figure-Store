package com.JewelleryStore.main.controller.accountManagement;

import com.JewelleryStore.main.model.DTO.ChangePasswordDTO;
import com.JewelleryStore.main.model.DTO.UserUpdateDTO;
import com.JewelleryStore.main.model.User;
import com.JewelleryStore.main.model.UserAddress;
import com.JewelleryStore.main.service.FileStorageService;
import com.JewelleryStore.main.service.UserAddressService;
import com.JewelleryStore.main.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/account")
public class UserInfoController {
    private final UserService userService;
    private final UserAddressService userAddressService;
    private FileStorageService fileStorageService;

    public UserInfoController(UserService userService, UserAddressService userAddressService, FileStorageService fileStorageService) {
        this.userService = userService;
        this.userAddressService = userAddressService;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping
    public ResponseEntity<User> accountInfo (Authentication authentication){
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        Optional<User> optionalUser = userService.findByEmail(email);

        if (optionalUser.isPresent()){
            User user = optionalUser.get();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/update-profile")
    public ResponseEntity<User> updateProfie (Authentication authentication, @RequestBody UserUpdateDTO updateRequest) {
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        String email = userDetails.getUsername();

        Optional<User> optionalUser = userService.findByEmail(email);

        if (optionalUser.isPresent()){
            User user = optionalUser.get();
            user.setFirstName(updateRequest.getFirstName());
            user.setLastName(updateRequest.getLastName());
            user.setPhoneNumber(updateRequest.getPhoneNumber());
            userService.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/update-profile-image")
    public ResponseEntity<User> updateProfileImage (Authentication authentication,
                                                    @RequestParam("image")MultipartFile image){
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        String email = userDetails.getUsername();

        Optional<User> optionalUser = userService.findByEmail(email);
        if (optionalUser.isPresent()){
            User user = optionalUser.get();
            try {
                String imgUrl = fileStorageService.storeFile(image);
                user.setProfileImage(imgUrl);
                userService.save(user);
                return ResponseEntity.ok(user);
            } catch (IOException ex) {
                ex.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/change-password")
    public ResponseEntity<String> changePassword (Authentication authentication, @RequestBody ChangePasswordDTO changePasswordDTO) {
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        String email = userDetails.getUsername();

        Optional<User> optionalUser = userService.findByEmail(email);

        if (optionalUser.isPresent()){
            User user = optionalUser.get();

            if (!userService.checkPassword(user, changePasswordDTO.getOldPassword())){
                return ResponseEntity.badRequest().body("Mật khẩu cũ không đúng");
            }

            if (!changePasswordDTO.getNewPassword().equals(changePasswordDTO.getConfirmPassword())){
                return ResponseEntity.badRequest().body("Mật khẩu không trùng nhau");
            }

            userService.changePassword(user, changePasswordDTO.getNewPassword());
            return ResponseEntity.ok("Đổi mật khẩu thành công");
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/set-address/{id}")
    public ResponseEntity<User> setDefaultAddress(Authentication authentication, @PathVariable UUID id) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        Optional<User> optionalUser = userService.findByEmail(email);
        if (optionalUser.isPresent()){
            User user = optionalUser.get();

            Optional<UserAddress> userAddress = userAddressService.findById(id);

            if (userAddress.isPresent()){
                user.setDefaultAddress(userAddress.get());
                userService.save(user);
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
