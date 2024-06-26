package com.JewelleryStore.main.service;

import com.JewelleryStore.main.model.DTO.AuthenticationDTO;
import com.JewelleryStore.main.model.User;

public interface AuthenticationService {
    AuthenticationDTO register (User request);
    AuthenticationDTO authenticate(User request);
}
