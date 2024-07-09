package com.example.server.auth;

import com.example.server.repositories.UserRepository;
import com.example.server.repositories.RoleRepository;
import com.example.server.services.JwtService;
import com.example.server.entities.User;
import com.example.server.entities.Role;
import com.example.server.token.Token;
import com.example.server.token.TokenRepository;
import com.example.server.token.TokenType;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final RoleRepository roleRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        // Vérifiez que tous les champs obligatoires sont définis
        if (request.getUsername() == null || request.getUsername().isEmpty()) {
            throw new IllegalArgumentException("Firstname is required");
        }
        if (request.getLastname() == null || request.getLastname().isEmpty()) {
            throw new IllegalArgumentException("Lastname is required");
        }
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }
        if (request.getRole() == null || request.getRole().getName() == null || request.getRole().getName().isEmpty()) {
            throw new IllegalArgumentException("Role is required");
        }

        // Fetch the existing role from the database
        Optional<Role> roleOpt = roleRepository.findByName(request.getRole().getName());

        // Use the existing role if found, or create a new one if not
        Role role = roleOpt.orElseGet(() -> {
            Role newRole = new Role();
            newRole.setName(request.getRole().getName());
            newRole.setDescription(request.getRole().getDescription());
            return roleRepository.save(newRole);
        });

        // Créez l'objet User avec toutes les valeurs obligatoires
        var user = User.builder()
                .username(request.getUsername()) // Assurez-vous que c'est ce que vous voulez pour le username
                .lastName(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        // Sauvegardez l'utilisateur dans la base de données
        repository.save(user);

        // Générez le token JWT
        var savedUser = repository.save(user);
        var jwtToken = jwtService.generateToken(user);

        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)

                .build();
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        saveUserToken(user, jwtToken);
        System.out.println(jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

}
