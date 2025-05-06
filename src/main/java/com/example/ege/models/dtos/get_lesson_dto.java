package com.example.ege.models.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class get_lesson_dto {
    private Long id;
    private String title;
    private String description;
    private String content;
}
