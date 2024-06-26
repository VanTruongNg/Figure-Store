package com.JewelleryStore.main;

import com.JewelleryStore.main.model.User;
import com.JewelleryStore.main.model.enums.Role;
import com.JewelleryStore.main.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@SpringBootApplication
public class MainApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(MainApplication.class, args);
	}

	public void run(String... args) {
		List<User> adminAccount = userRepository.findByRole(Role.ADMIN);
		if (adminAccount.isEmpty()) {
			User user = new User();
			user.setRole(Role.ADMIN);
			user.setEmail("admin@gmail.com");
			user.setFirstName("Admin");
			user.setLastName("Manager");
			user.setPhoneNumber("0789479289");
			user.setPassword(new BCryptPasswordEncoder().encode("admin"));
			userRepository.save(user);
		}
	}
}
