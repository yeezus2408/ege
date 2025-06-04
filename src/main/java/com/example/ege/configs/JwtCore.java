package com.example.ege.configs;


import com.example.ege.models.UserDetailsImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtCore {
    @Value("${spring.token.signing.secret}")
    private String secret;
    @Value("${spring.token.signing.expirationMs}")
    private int lifetime;

    public String generateToken(Authentication auth) {
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", userDetails.getUsername());
        claims.put("email", userDetails.getEmail());
        claims.put("id", userDetails.getId());
        return Jwts.builder()
                .setSubject(userDetails.getEmail()).setIssuedAt(new Date())
                .setClaims(claims)
                .setSubject(userDetails.getId().toString())
                .setExpiration(new Date(new Date().getTime()+lifetime))
                .signWith(SignatureAlgorithm.HS256, secret).compact();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Base64.getDecoder().decode(secret.getBytes(StandardCharsets.UTF_8));
        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    public String getEmailFromToken(String token) {
        return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token).getBody().get("email", String.class);
    }

    public Long getIdFromToken(String token) {
        return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token).getBody().get("id", Long.class);
    }
}
