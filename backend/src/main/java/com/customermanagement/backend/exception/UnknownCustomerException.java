package com.customermanagement.backend.exception;

public class UnknownCustomerException extends RuntimeException {
    public UnknownCustomerException(String message) {
        super(message);
    }
    
}
