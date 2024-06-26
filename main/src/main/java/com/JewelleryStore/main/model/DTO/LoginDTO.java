package com.JewelleryStore.main.model.DTO;

import com.JewelleryStore.main.model.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
    private AuthenticationDTO authenticationDTO;
    private User user;
}
