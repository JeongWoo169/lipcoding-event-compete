package com.example.mentormentee.service;

import com.example.mentormentee.domain.Profile;
import com.example.mentormentee.domain.User;
import com.example.mentormentee.dto.ProfileRequest;
import com.example.mentormentee.dto.ProfileResponse;
import com.example.mentormentee.repository.ProfileRepository;
import com.example.mentormentee.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import com.example.mentormentee.domain.Role;

@Service
public class ProfileService {
	private final ProfileRepository profileRepository;
	private final UserRepository userRepository;

	public ProfileService(ProfileRepository profileRepository, UserRepository userRepository) {
		this.profileRepository = profileRepository;
		this.userRepository = userRepository;
	}

	private User getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
	}

	@Transactional
	public ProfileResponse createOrUpdateProfile(ProfileRequest request) {
		User user = getCurrentUser();
		Profile profile = profileRepository.findByUser(user)
				.orElse(new Profile());
		profile.setUser(user);
		profile.setName(request.getName());
		profile.setBio(request.getBio());
		profile.setTechStack(request.getTechStack());
		profile.setImageUrl(request.getImageUrl());
		profileRepository.save(profile);
		return toResponse(profile);
	}

	@Transactional(readOnly = true)
	public ProfileResponse getMyProfile() {
		User user = getCurrentUser();
		Profile profile = profileRepository.findByUser(user)
				.orElseThrow(() -> new RuntimeException("Profile not found"));
		return toResponse(profile);
	}

	@Transactional(readOnly = true)
	public List<ProfileResponse> getMentorProfiles() {
		List<Profile> mentors = profileRepository.findAllByUserRole(Role.MENTOR);
		return mentors.stream().map(this::toResponse).toList();
	}

	@Transactional
	public String saveProfileImage(MultipartFile file) throws IOException {
		User user = getCurrentUser();
		Profile profile = profileRepository.findByUser(user).orElse(new Profile());
		profile.setUser(user);
		// 이미지를 base64로 저장 (DB 저장 예시)
		String base64 = Base64.getEncoder().encodeToString(file.getBytes());
		profile.setImage(base64);
		// imageUrl은 null로 두거나, 필요시 접근용 URL 생성
		profile.setImageUrl(null);
		profileRepository.save(profile);
		return "uploaded";
	}

	private ProfileResponse toResponse(Profile profile) {
		String imageUrl = profile.getImageUrl();
		if ((imageUrl == null || imageUrl.isBlank()) && (profile.getImage() == null || profile.getImage().isBlank())) {
			// 기본 이미지 URL 역할별 적용
			if (profile.getUser().getRole() == Role.MENTOR) {
				imageUrl = "https://placehold.co/500x500.jpg?text=MENTOR";
			} else {
				imageUrl = "https://placehold.co/500x500.jpg?text=MENTEE";
			}
		}
		return new ProfileResponse(
				profile.getId(),
				profile.getName(),
				profile.getBio(),
				profile.getTechStack(),
				imageUrl,
				profile.getUser().getRole(),
				profile.getUser().getEmail());
	}
}
