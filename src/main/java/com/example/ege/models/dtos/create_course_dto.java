package com.example.ege.models.dtos;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class create_course_dto {
    private String course_name;
    private String course_description;
    private Integer course_price;
    private String course_subject;

}
