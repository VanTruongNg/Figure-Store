package com.JewelleryStore.main.model.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationDTO {
    private String token;
    private String message;
}
