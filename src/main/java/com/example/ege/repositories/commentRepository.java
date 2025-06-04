package com.example.ege.repositories;

import com.example.ege.models.comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface commentRepository extends JpaRepository<comment, Long> {
    List<comment> findByCourseId(Long courseId);
}
