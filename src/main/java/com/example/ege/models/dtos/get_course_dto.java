package com.example.ege.models.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class get_course_dto {
    private Long id;
    private String name;
    private Integer price;
    private String description;
    private String status;
    private Long author_id;
    private String subject;
    private List<Integer> starRiting;
    private List<get_lesson_dto> lessons;
}
