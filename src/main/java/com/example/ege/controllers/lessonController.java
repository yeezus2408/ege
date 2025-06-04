package com.example.ege.controllers;


import com.example.ege.models.course;
import com.example.ege.models.dtos.create_lesson_dto;
import com.example.ege.models.lesson;
import com.example.ege.repositories.courseRepository;
import com.example.ege.repositories.lessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/lesson")
@RequiredArgsConstructor
public class lessonController {
    private final courseRepository courseRepository;
    private final lessonRepository lessonRepository;

    @PostMapping("/course={courseId}/addLesson")
    public ResponseEntity<?> addLesson(@RequestBody create_lesson_dto new_leesson_dto, @PathVariable Long courseId) {
        course course = courseRepository.findById(courseId).get();
        lesson newLesson = new lesson();
        newLesson.setTitle(new_leesson_dto.getTitle());
        newLesson.setDescription(new_leesson_dto.getDescription());
        newLesson.setContent(new_leesson_dto.getContent());

        lesson savedLesson = lessonRepository.save(newLesson);
        course.getLessons().add(savedLesson);


        courseRepository.save(course);
        return ResponseEntity.ok().build();
    }
}
