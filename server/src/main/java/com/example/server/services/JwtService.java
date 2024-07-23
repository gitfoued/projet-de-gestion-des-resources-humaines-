package com.example.server.services;

import com.example.server.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    @Value("${secret-key}")
    private String secretKey;

    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;

    // Extraire l'email du token
    public String extractUsername(String token) {
        return extractClaim(token, claims -> claims.get("email", String.class));
    }

    // Extraire une valeur de claim spécifique
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Générer un token avec UserDetails
    public String generateToken(User user) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("email", user.getUsername()); // Utiliser l'email du user pour les claims
        return buildToken(extraClaims, user.getUsername(), jwtExpiration);
    }

    // Construire le token avec les claims supplémentaires, l'email et l'expiration
    public String buildToken(Map<String, Object> extraClaims, String email, long expiration) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(email) // Utiliser l'email pour le subject
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Vérifier si le token est valide
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String email = extractUsername(token);
        return (email.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    // Vérifier si le token a expiré
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extraire la date d'expiration du token
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Extraire tous les claims du token
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Obtenir la clé de signature
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
