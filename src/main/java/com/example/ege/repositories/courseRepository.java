package com.example.ege.repositories;


import com.example.ege.models.course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface courseRepository extends JpaRepository<course, Long> {
    course findCourseByName(String name);
}
