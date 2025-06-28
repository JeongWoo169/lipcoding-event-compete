package com.example.mentormentee.dto;

public class ProfileRequest {
	private String name;
	private String bio;
	private String techStack;
	private String imageUrl;

	public ProfileRequest() {
	}

	public ProfileRequest(String name, String bio, String techStack, String imageUrl) {
		this.name = name;
		this.bio = bio;
		this.techStack = techStack;
		this.imageUrl = imageUrl;
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
}
