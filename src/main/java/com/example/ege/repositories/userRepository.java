package com.example.ege.repositories;

import com.example.ege.models.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface userRepository extends JpaRepository<user, Long> {
    user findByEmail(String email);
    boolean existsByEmail(String email);
}
