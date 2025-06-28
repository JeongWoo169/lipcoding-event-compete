package com.example.mentormentee.controller;

import com.example.mentormentee.dto.ProfileRequest;
import com.example.mentormentee.dto.ProfileResponse;
import com.example.mentormentee.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import java.io.IOException;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
	private final ProfileService profileService;

	public ProfileController(ProfileService profileService) {
		this.profileService = profileService;
	}

	@GetMapping
	public ResponseEntity<ProfileResponse> getMyProfile() {
		return ResponseEntity.ok(profileService.getMyProfile());
	}

	@PostMapping
	public ResponseEntity<ProfileResponse> createOrUpdateProfile(@RequestBody ProfileRequest request) {
		return ResponseEntity.ok(profileService.createOrUpdateProfile(request));
	}

	@PutMapping
	public ResponseEntity<ProfileResponse> updateProfile(@RequestBody ProfileRequest request) {
		return ResponseEntity.ok(profileService.createOrUpdateProfile(request));
	}

	@PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> uploadProfileImage(@RequestParam("file") MultipartFile file) throws IOException {
		// 1. 확장자 및 MIME 타입 체크
		String filename = file.getOriginalFilename();
		if (filename == null
				|| !(filename.endsWith(".jpg") || filename.endsWith(".jpeg") || filename.endsWith(".png"))) {
			return ResponseEntity.badRequest().body("이미지는 .jpg/.jpeg/.png만 허용");
		}
		String contentType = file.getContentType();
		if (contentType == null || !(contentType.equals("image/jpeg") || contentType.equals("image/png"))) {
			return ResponseEntity.badRequest().body("이미지 MIME 타입 오류");
		}
		// 2. 크기 체크
		if (file.getSize() > 1024 * 1024) {
			return ResponseEntity.badRequest().body("이미지 크기는 1MB 이하만 허용");
		}
		// 3. 해상도 체크
		BufferedImage image = ImageIO.read(file.getInputStream());
		if (image == null) {
			return ResponseEntity.badRequest().body("이미지 파일이 아닙니다");
		}
		int width = image.getWidth();
		int height = image.getHeight();
		if (width != height || width < 500 || width > 1000) {
			return ResponseEntity.badRequest().body("정사각형 500~1000px만 허용");
		}
		// 4. 저장 및 URL 반환 (ProfileService에 위임)
		String imageUrl = profileService.saveProfileImage(file);
		return ResponseEntity.ok(imageUrl);
	}
}
