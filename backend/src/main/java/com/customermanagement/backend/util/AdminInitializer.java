package com.customermanagement.backend.util;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.customermanagement.backend.entity.Admin;
import com.customermanagement.backend.repository.AdminRepository;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @Override
    public void run(String... args) {
        if (adminRepository.findByUsername(adminUsername).isEmpty()) {
            Admin admin = new Admin();
            admin.setUsername(adminUsername);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole("ROLE_ADMIN");
            adminRepository.save(admin);
            System.out.println("Default admin created");
        } else {
            System.out.println("Admin already exists, skipping");
        }
    }
}