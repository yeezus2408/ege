package com.example.ege.models.dtos;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class userData_after_login {
    private Long id;
    private String username;
    private String email;
    private float balance;
    private List<get_course_dto> courses;
    private String token;
}
