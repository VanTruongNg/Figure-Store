package com.JewelleryStore.main.service.impl;

import com.JewelleryStore.main.model.Order;
import com.JewelleryStore.main.model.OrderProduct;
import com.JewelleryStore.main.model.User;
import com.JewelleryStore.main.model.enums.OrderStatus;
import com.JewelleryStore.main.repository.OrderProductRepository;
import com.JewelleryStore.main.repository.OrderRepository;
import com.JewelleryStore.main.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderProductRepository orderProductRepository;

    @Autowired
    public OrderServiceImpl (OrderRepository orderRepository, OrderProductRepository orderProductRepository) {
        this.orderProductRepository = orderProductRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUser(user);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(UUID orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<OrderProduct> getOrderProducts(UUID orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            return orderProductRepository.findByOrder(order);
        }
        return null;
    }

    @Override
    public Order addProductToOrder(UUID orderId, OrderProduct orderProduct) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()){
            orderProduct.setOrder(optionalOrder.get());
            orderProductRepository.save(orderProduct);
            return optionalOrder.get();
        }
        return null;
    }

    @Override
    public Order updateOrderStatus(UUID orderId, OrderStatus orderStatus) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()){
            Order order = optionalOrder.get();
            order.setStatus(orderStatus);
            return orderRepository.save(order);
        }
        return null;
    }
}
