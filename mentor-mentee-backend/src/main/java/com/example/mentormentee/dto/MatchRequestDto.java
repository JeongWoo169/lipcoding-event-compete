package com.example.mentormentee.dto;

public class MatchRequestDto {
	private Long mentorId;
	private String message;

	public MatchRequestDto() {
	}

	public MatchRequestDto(Long mentorId, String message) {
		this.mentorId = mentorId;
		this.message = message;
	}

	public Long getMentorId() {
		return mentorId;
	}

	public void setMentorId(Long mentorId) {
		this.mentorId = mentorId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
