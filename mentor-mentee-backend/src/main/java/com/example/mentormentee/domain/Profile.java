package com.example.mentormentee.domain;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Profile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(length = 1000)
	private String bio;

	@Column(length = 1000000)
	private String image; // base64 encoded or url

	@Column
	private String imageUrl; // for default or served image

	@ElementCollection
	private List<String> skills;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	public Profile() {
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

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public List<String> getSkills() {
		return skills;
	}

	public void setSkills(List<String> skills) {
		this.skills = skills;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getTechStack() {
		return (skills == null || skills.isEmpty()) ? null : String.join(",", skills);
	}

	public void setTechStack(String techStack) {
		if (techStack == null || techStack.isBlank()) {
			this.skills = null;
		} else {
			this.skills = java.util.Arrays.asList(techStack.split(","));
		}
	}
}
