package com.example.mentormentee.dto;

public class SignupRequest {
	private String email;
	private String password;
	private String name;
	private com.example.mentormentee.domain.Role role;

	public SignupRequest() {
	}

	public SignupRequest(String email, String password, String name, com.example.mentormentee.domain.Role role) {
		this.email = email;
		this.password = password;
		this.name = name;
		this.role = role;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public com.example.mentormentee.domain.Role getRole() {
		return role;
	}

	public void setRole(com.example.mentormentee.domain.Role role) {
		this.role = role;
	}
}
