package com.JewelleryStore.main.service.impl;

import com.JewelleryStore.main.model.DTO.AuthenticationDTO;
import com.JewelleryStore.main.model.Token;
import com.JewelleryStore.main.model.User;
import com.JewelleryStore.main.model.enums.Role;
import com.JewelleryStore.main.repository.TokenRepository;
import com.JewelleryStore.main.repository.UserRepository;
import com.JewelleryStore.main.service.AuthenticationService;
import com.JewelleryStore.main.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationServiceImpl(UserRepository userRepository,
                                     PasswordEncoder passwordEncoder,
                                     JwtService jwtService,
                                     TokenRepository tokenRepository,
                                     AuthenticationManager authenticationManager){
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
    }

    @Override
    public AuthenticationDTO register(User request) {
        if (userRepository.findByEmail(request.getUsername()).isPresent()){
            return new AuthenticationDTO(null, "Tài khoản đã tồn tại");
        }

        User newUser = new User();
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setEmail(request.getEmail());
        newUser.setPhoneNumber(request.getPhoneNumber());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));

        newUser.setRole(Role.USER);

        newUser = userRepository.save(newUser);

        String jwt = jwtService.generateToken(newUser);

        saveUserToken(jwt, newUser);

        return new AuthenticationDTO(jwt, "Đăng ký thành công!");
    }

    private void saveUserToken(String jwt, User user) {
        Token token = new Token();
        token.setToken(jwt);
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }

    @Override
    public AuthenticationDTO authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getUsername()).orElseThrow();
        String jwt = jwtService.generateToken(user);

        revokeAllTokenByUser(user);
        saveUserToken(jwt, user);

        return new AuthenticationDTO(jwt, "Đăng nhập thành công!");
    }

    private void revokeAllTokenByUser(User user){
        List<Token> validTokens = tokenRepository.findAllTokenByUser(user.getUserId());
        if (validTokens.isEmpty()){
            return;
        }

        validTokens.forEach(t -> t.setLoggedOut(true));

        tokenRepository.saveAll(validTokens);
    }

}
