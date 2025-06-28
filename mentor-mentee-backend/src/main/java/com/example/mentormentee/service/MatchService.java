package com.example.mentormentee.service;

import com.example.mentormentee.domain.MatchRequest;
import com.example.mentormentee.domain.User;
import com.example.mentormentee.dto.MatchRequestDto;
import com.example.mentormentee.dto.MatchResponseDto;
import com.example.mentormentee.repository.MatchRequestRepository;
import com.example.mentormentee.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MatchService {
	private final MatchRequestRepository matchRequestRepository;
	private final UserRepository userRepository;

	public MatchService(MatchRequestRepository matchRequestRepository, UserRepository userRepository) {
		this.matchRequestRepository = matchRequestRepository;
		this.userRepository = userRepository;
	}

	private User getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
	}

	@Transactional
	public MatchResponseDto requestMatch(MatchRequestDto dto) {
		User mentee = getCurrentUser();
		User mentor = userRepository.findById(dto.getMentorId())
				.orElseThrow(() -> new UsernameNotFoundException("Mentor not found: " + dto.getMentorId()));
		MatchRequest match = new MatchRequest();
		match.setMentor(mentor);
		match.setMentee(mentee);
		match.setStatus(MatchRequest.Status.PENDING);
		match.setMessage(dto.getMessage());
		matchRequestRepository.save(match);
		return toResponse(match);
	}

	@Transactional
	public MatchResponseDto acceptMatch(Long matchId) {
		MatchRequest match = matchRequestRepository.findById(matchId)
				.orElseThrow(() -> new RuntimeException("Match not found"));
		match.accept();
		return toResponse(match);
	}

	@Transactional
	public MatchResponseDto rejectMatch(Long matchId) {
		MatchRequest match = matchRequestRepository.findById(matchId)
				.orElseThrow(() -> new RuntimeException("Match not found"));
		match.reject();
		return toResponse(match);
	}

	@Transactional
	public MatchResponseDto cancelMatch(Long matchId) {
		MatchRequest match = matchRequestRepository.findById(matchId)
				.orElseThrow(() -> new RuntimeException("Match not found"));
		match.cancel();
		return toResponse(match);
	}

	@Transactional(readOnly = true)
	public List<MatchResponseDto> getMyMatchRequestsAsMentee() {
		User mentee = getCurrentUser();
		List<MatchRequest> matches = matchRequestRepository.findByMentee(mentee);
		return matches.stream().map(this::toResponse).toList();
	}

	@Transactional(readOnly = true)
	public List<MatchResponseDto> getMyMatchRequestsAsMentor() {
		User mentor = getCurrentUser();
		List<MatchRequest> matches = matchRequestRepository.findByMentor(mentor);
		return matches.stream().map(this::toResponse).toList();
	}

	private MatchResponseDto toResponse(MatchRequest match) {
		return new MatchResponseDto(
				match.getId(),
				match.getMentor().getId(),
				match.getMentee().getId(),
				match.getStatus().name(),
				match.getMessage());
	}
}
