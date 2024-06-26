package com.JewelleryStore.main.service;

import com.JewelleryStore.main.model.User;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.function.Function;

public interface JwtService {
    String extractUsername(String token);
    boolean isValid(String token, UserDetails user);
    <T> T extractClaim(String token, Function<Claims, T> resolver);
    String generateToken(User user);
}
