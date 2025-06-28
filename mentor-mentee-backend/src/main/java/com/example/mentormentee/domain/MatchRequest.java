package com.example.mentormentee.domain;

import jakarta.persistence.*;

@Entity
public class MatchRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "mentor_id", nullable = false)
	private User mentor;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "mentee_id", nullable = false)
	private User mentee;

	@Column(nullable = false, length = 1000)
	private String message;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Status status;

	public enum Status {
		PENDING, ACCEPTED, REJECTED, CANCELLED
	}

	public MatchRequest() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getMentor() {
		return mentor;
	}

	public void setMentor(User mentor) {
		this.mentor = mentor;
	}

	public User getMentee() {
		return mentee;
	}

	public void setMentee(User mentee) {
		this.mentee = mentee;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public void accept() {
		this.status = Status.ACCEPTED;
	}

	public void reject() {
		this.status = Status.REJECTED;
	}

	public void cancel() {
		this.status = Status.CANCELLED;
	}
}
