package com.JewelleryStore.main.controller.user;

import com.JewelleryStore.main.model.DTO.OrderProductDTO;
import com.JewelleryStore.main.model.Order;
import com.JewelleryStore.main.model.OrderProduct;
import com.JewelleryStore.main.model.Product;
import com.JewelleryStore.main.model.User;
import com.JewelleryStore.main.model.enums.OrderStatus;
import com.JewelleryStore.main.service.OrderService;
import com.JewelleryStore.main.service.ProductService;
import com.JewelleryStore.main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/user/orders")
public class OrderController {
    private final OrderService orderService;
    private final UserService userService;
    private final ProductService productService;

    @Autowired
    public OrderController(OrderService orderService, UserService userService, ProductService productService) {
        this.orderService = orderService;
        this.userService = userService;
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getOrdersByUser (Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        Optional<User> optionalUser = userService.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Order> orders = orderService.getOrdersByUser(user);
            return ResponseEntity.ok(orders);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable UUID orderId) {
        Order order = orderService.getOrderById(orderId);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(Authentication authentication, @RequestBody Order order) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        Optional<User> optionalUser = userService.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            order.setUser(user);
            order.setOrderDate(LocalDate.now());
            order.setStatus(OrderStatus.PENDING);
            Order createdOrder = orderService.createOrder(order);
            return ResponseEntity.ok(createdOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{orderId}/products/add")
    public ResponseEntity<Order> addProductToOrder(@PathVariable UUID orderId, @RequestBody OrderProductDTO orderProductDTO) {
        Optional<Product> product = productService.getProductById(orderProductDTO.getProductId());
        OrderProduct orderProduct = new OrderProduct();
        orderProduct.setQuantity(orderProductDTO.getQuantity());
        orderProduct.setProduct(product.get());
        Order order = orderService.addProductToOrder(orderId, orderProduct);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable UUID orderId, @RequestBody OrderStatus status) {
        Order updatedOrder = orderService.updateOrderStatus(orderId, status);
        if (updatedOrder != null) {
            return ResponseEntity.ok(updatedOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
