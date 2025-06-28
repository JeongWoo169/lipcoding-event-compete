package com.example.mentormentee.repository;

import com.example.mentormentee.domain.MatchRequest;
import com.example.mentormentee.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MatchRequestRepository extends JpaRepository<MatchRequest, Long> {
	List<MatchRequest> findByMentor(User mentor);

	List<MatchRequest> findByMentee(User mentee);

	List<MatchRequest> findByMentorAndStatus(User mentor, MatchRequest.Status status);

	List<MatchRequest> findByMenteeAndStatus(User mentee, MatchRequest.Status status);
}
