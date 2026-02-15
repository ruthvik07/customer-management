package com.customermanagement.backend.dto;

public record AuthRequestDto(
        String username,
        String password
) {}
