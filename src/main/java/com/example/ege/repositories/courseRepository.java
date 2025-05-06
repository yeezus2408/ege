package com.example.ege.repositories;


import com.example.ege.models.course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface courseRepository extends JpaRepository<course, Long> {

}
