
package com.example.server.auth;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@ResponseBody
public class AuthenticationController {

    private final AuthenticationService service;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    @PostMapping("/register")
    @CrossOrigin(origins="http://localhost:3000")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping(value = "/Login", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins="http://localhost:3000")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = service.authenticate(request);
        return ResponseEntity.ok(response);
    }
}