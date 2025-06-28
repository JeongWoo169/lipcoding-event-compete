package com.example.mentormentee.controller;

import com.example.mentormentee.domain.User;
import com.example.mentormentee.dto.AuthResponse;
import com.example.mentormentee.dto.LoginRequest;
import com.example.mentormentee.dto.SignupRequest;
import com.example.mentormentee.security.JwtProvider;
import com.example.mentormentee.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
	private final AuthService authService;
	private final JwtProvider jwtProvider;

	public AuthController(AuthService authService, JwtProvider jwtProvider) {
		this.authService = authService;
		this.jwtProvider = jwtProvider;
	}

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
		User user = authService.signup(request);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
		User user = authService.login(request);
		String token = jwtProvider.createToken(user.getId(), user.getProfile().getName(), user.getEmail(),
				user.getRole());
		return ResponseEntity.ok(new AuthResponse(token));
	}
}
