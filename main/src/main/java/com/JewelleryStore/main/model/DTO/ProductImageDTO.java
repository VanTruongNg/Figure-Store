package com.JewelleryStore.main.model.DTO;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductImageDTO {
    private UUID productId;
    private String image;
}
