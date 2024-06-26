package com.JewelleryStore.main.model.DTO;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private String name;
    private String description;
    private double price;
    private String brand;
    private String scale;
    private UUID category;
}
