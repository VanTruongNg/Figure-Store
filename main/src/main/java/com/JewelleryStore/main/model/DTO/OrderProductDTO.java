package com.JewelleryStore.main.model.DTO;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class  OrderProductDTO {
    private UUID productId;
    private int quantity;
}
