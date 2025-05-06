package com.example.ege.utils;

import com.example.ege.models.course;
import com.example.ege.models.dtos.get_course_dto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CourseMapperImpl extends CourseMapper {
    @Override
    public get_course_dto map(course course) {
        if(course == null){
            return null;
        } else {
            get_course_dto dto = new get_course_dto();
            dto.setId(course.getId());
            dto.setName(course.getName());
            dto.setDescription(course.getDescription());
            dto.setPrice(course.getPrice());
            dto.setStatus(course.getStatus());
            dto.setAuthor_id(course.getAuthor().getId());
            List<Long> lesson_ids = new ArrayList<>();
            for (int i = 0; i < course.getLessons().size(); i++) {
                lesson_ids.add(course.getLessons().get(i).getId());
            }
            dto.setLesson_ids(lesson_ids);
            return dto;
        }
    }
}
