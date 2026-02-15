package com.customermanagement.backend.dto;

public record CustomerRequestDto(
        String firstName,
        String lastName,
        String email,
        String phone
) {
}
