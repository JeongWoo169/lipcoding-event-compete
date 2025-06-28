package com.example.mentormentee.controller;

import com.example.mentormentee.dto.ProfileResponse;
import com.example.mentormentee.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mentors")
public class MentorController {
	private final ProfileService profileService;

	public MentorController(ProfileService profileService) {
		this.profileService = profileService;
	}

	@GetMapping
	public ResponseEntity<List<ProfileResponse>> getMentors() {
		return ResponseEntity.ok(profileService.getMentorProfiles());
	}
}
