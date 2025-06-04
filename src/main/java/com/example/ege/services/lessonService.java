package com.example.ege.services;

import com.example.ege.models.course;
import com.example.ege.models.dtos.create_lesson_dto;
import com.example.ege.models.lesson;
import com.example.ege.repositories.courseRepository;
import com.example.ege.repositories.lessonRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class lessonService {
    private courseRepository courseRepository;
    private lessonRepository lessonRepository;

    public ResponseEntity<?> createLesson(Long id_course, create_lesson_dto dto) {
        Optional<course> course = courseRepository.findById(id_course);
        if (!course.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        lesson newLesson = new lesson();
        newLesson.setTitle(dto.getTitle());
        newLesson.setDescription(dto.getDescription());
        newLesson.setContent(dto.getContent());
        course.get().getLessons().add(newLesson);
        lessonRepository.save(newLesson);
        courseRepository.save(course.get());
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> updateLesson(Long id_lesson, create_lesson_dto updated_dto) {
        Optional<lesson> finded_lesson = lessonRepository.findById(id_lesson);
        if (!finded_lesson.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        lesson updateLesson = new lesson();
        updateLesson.setTitle(updated_dto.getTitle());
        updateLesson.setDescription(updated_dto.getDescription());
        updateLesson.setContent(updated_dto.getContent());
        lessonRepository.save(updateLesson);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> deleteLesson(Long id_lesson) {
        Optional<lesson> finded_lesson = lessonRepository.findById(id_lesson);
        if (finded_lesson.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        lessonRepository.delete(finded_lesson.get());
        return ResponseEntity.ok().build();
    }
}
