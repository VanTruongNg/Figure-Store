package com.JewelleryStore.main.service;

import com.JewelleryStore.main.model.Order;
import com.JewelleryStore.main.model.OrderProduct;
import com.JewelleryStore.main.model.User;
import com.JewelleryStore.main.model.enums.OrderStatus;

import java.util.List;
import java.util.UUID;

public interface OrderService {
    List<Order> getOrdersByUser(User user);
    List<Order> getAllOrders();
    Order getOrderById(UUID orderId);
    Order createOrder(Order order);
    List<OrderProduct> getOrderProducts(UUID orderId);
    Order addProductToOrder(UUID orderId, OrderProduct orderProduct);
    Order updateOrderStatus (UUID orderId, OrderStatus orderStatus);
}
