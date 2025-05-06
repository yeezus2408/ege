package com.example.ege.services;


import com.example.ege.models.course;
import com.example.ege.models.dtos.create_course_dto;
import com.example.ege.repositories.courseRepository;
import org.springframework.stereotype.Service;

@Service
public class courseService {
    private final com.example.ege.repositories.courseRepository courseRepository;

    public courseService(courseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public void createCourse(create_course_dto dto) {
        course newCourse = new course();
        newCourse.setName(dto.getCourse_name());
        newCourse.setDescription(dto.getCourse_description());
        newCourse.setPrice(dto.getCourse_price());
        courseRepository.save(newCourse);
    }
}
