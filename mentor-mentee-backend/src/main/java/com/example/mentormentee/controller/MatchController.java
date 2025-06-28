package com.example.mentormentee.controller;

import com.example.mentormentee.dto.MatchRequestDto;
import com.example.mentormentee.dto.MatchResponseDto;
import com.example.mentormentee.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/match")
public class MatchController {
	private final MatchService matchService;

	public MatchController(MatchService matchService) {
		this.matchService = matchService;
	}

	@PostMapping
	public ResponseEntity<MatchResponseDto> requestMatch(@RequestBody MatchRequestDto dto) {
		return ResponseEntity.ok(matchService.requestMatch(dto));
	}

	@PostMapping("/accept/{id}")
	public ResponseEntity<MatchResponseDto> acceptMatch(@PathVariable Long id) {
		return ResponseEntity.ok(matchService.acceptMatch(id));
	}

	@PostMapping("/reject/{id}")
	public ResponseEntity<MatchResponseDto> rejectMatch(@PathVariable Long id) {
		return ResponseEntity.ok(matchService.rejectMatch(id));
	}

	@PostMapping("/cancel/{id}")
	public ResponseEntity<MatchResponseDto> cancelMatch(@PathVariable Long id) {
		return ResponseEntity.ok(matchService.cancelMatch(id));
	}

	@GetMapping("/mentee")
	public ResponseEntity<List<MatchResponseDto>> getMyMatchRequestsAsMentee() {
		return ResponseEntity.ok(matchService.getMyMatchRequestsAsMentee());
	}

	@GetMapping("/mentor")
	public ResponseEntity<List<MatchResponseDto>> getMyMatchRequestsAsMentor() {
		return ResponseEntity.ok(matchService.getMyMatchRequestsAsMentor());
	}
}
