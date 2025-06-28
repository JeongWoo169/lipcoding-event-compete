package com.example.mentormentee.repository;

import com.example.mentormentee.domain.Profile;
import com.example.mentormentee.domain.Role;
import com.example.mentormentee.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
	List<Profile> findAllByUserRole(Role role);

	Optional<Profile> findByUser(User user);
}
