package com.example.mentormentee.security;

import com.example.mentormentee.domain.Role;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.UUID;

@Component
public class JwtProvider {
	private final JwtEncoder jwtEncoder;
	private final String issuer;
	private final String audience;
	private final long validityInMs;

	public JwtProvider(
			JwtEncoder jwtEncoder,
			@Value("${jwt.issuer:mentor-mentee-app}") String issuer,
			@Value("${jwt.audience:mentor-mentee-client}") String audience,
			@Value("${jwt.expiration:3600000}") long validityInMs) {
		this.jwtEncoder = jwtEncoder;
		this.issuer = issuer;
		this.audience = audience;
		this.validityInMs = validityInMs;
	}

	public String createToken(Long userId, String name, String email, Role role) {
		Instant now = Instant.now();
		Instant expiry = now.plusMillis(validityInMs);
		JwtClaimsSet claims = JwtClaimsSet.builder()
				.id(UUID.randomUUID().toString())
				.issuer(issuer)
				.audience(java.util.List.of(audience))
				.subject(String.valueOf(userId))
				.issuedAt(now)
				.notBefore(now)
				.expiresAt(expiry)
				.claim("name", name)
				.claim("email", email)
				.claim("role", role.name().toLowerCase())
				.build();
		return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
	}
}
