package com.example.mentormentee.dto;

import com.example.mentormentee.domain.Role;

public class ProfileResponse {
	private Long id;
	private String name;
	private String bio;
	private String techStack;
	private String imageUrl;
	private Role role;
	private String email;

	public ProfileResponse() {
	}

	public ProfileResponse(Long id, String name, String bio, String techStack, String imageUrl, Role role,
			String email) {
		this.id = id;
		this.name = name;
		this.bio = bio;
		this.techStack = techStack;
		this.imageUrl = imageUrl;
		this.role = role;
		this.email = email;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getTechStack() {
		return techStack;
	}

	public void setTechStack(String techStack) {
		this.techStack = techStack;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
