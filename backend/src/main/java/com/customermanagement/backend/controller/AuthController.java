package com.customermanagement.backend.controller;

import com.customermanagement.backend.dto.AuthRequestDto;
import com.customermanagement.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody AuthRequestDto authRequestDto) {

        // 1. Verify username and password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequestDto.username(),
                        authRequestDto.password()
                )
        );

        // 2. Generate JWT token
        String token = jwtUtil.generateToken(authentication.getName());

        // 3. Return token
        return ResponseEntity.ok(Map.of("token", token));
    }
}
