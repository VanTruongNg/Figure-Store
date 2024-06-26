package com.JewelleryStore.main.controller.auth;

import com.JewelleryStore.main.model.DTO.AuthenticationDTO;
import com.JewelleryStore.main.model.DTO.LoginDTO;
import com.JewelleryStore.main.model.User;
import com.JewelleryStore.main.service.AuthenticationService;
import com.JewelleryStore.main.service.JwtService;
import com.JewelleryStore.main.service.UserService;
import com.JewelleryStore.main.service.impl.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final UserService userService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(UserService userService, AuthenticationService authenticationService){
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationDTO> register (@RequestBody User request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDTO> login (@RequestBody User request) {
        AuthenticationDTO authentication = authenticationService.authenticate(request);
        Optional<User> user = userService.findByEmail(request.getUsername());

        LoginDTO loginDTO = new LoginDTO(authentication, user.get());
        return ResponseEntity.ok(loginDTO);
    }
}
