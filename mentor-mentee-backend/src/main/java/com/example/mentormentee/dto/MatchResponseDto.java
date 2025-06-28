package com.example.mentormentee.dto;

public class MatchResponseDto {
	private Long id;
	private Long mentorId;
	private Long menteeId;
	private String status;
	private String message;

	public MatchResponseDto() {
	}

	public MatchResponseDto(Long id, Long mentorId, Long menteeId, String status, String message) {
		this.id = id;
		this.mentorId = mentorId;
		this.menteeId = menteeId;
		this.status = status;
		this.message = message;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getMentorId() {
		return mentorId;
	}

	public void setMentorId(Long mentorId) {
		this.mentorId = mentorId;
	}

	public Long getMenteeId() {
		return menteeId;
	}

	public void setMenteeId(Long menteeId) {
		this.menteeId = menteeId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
