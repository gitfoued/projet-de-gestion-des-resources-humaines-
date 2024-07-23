package com.example.server.controllers;

import com.example.server.entities.User;
import com.example.server.entities.UserRoleResponse;
import com.example.server.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/role")
    public ResponseEntity<UserRoleResponse> getUserRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
            logger.error("Authentication or user details not found in security context");
            throw new UsernameNotFoundException("User details not found in security context");
        }

        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        logger.info("Attempting to fetch user role for email: {}", email);

        User user = userService.findByEmail(email);
        if (user != null) {
            logger.info("User found with role: {}", user.getRole().getName());
            return ResponseEntity.ok(new UserRoleResponse(user.getRole().getName()));
        } else {
            logger.warn("User not found for email: {}", email);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
