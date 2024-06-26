package com.JewelleryStore.main.repository;

import com.JewelleryStore.main.model.Order;
import com.JewelleryStore.main.model.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderProductRepository extends JpaRepository<OrderProduct, UUID> {
    List<OrderProduct> findByOrder(Order order);
}
