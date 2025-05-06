package com.example.ege.services;


import com.example.ege.models.dtos.create_user_dto;
import com.example.ege.models.user;
import com.example.ege.repositories.userRepository;
import org.springframework.stereotype.Service;

@Service
public class userService {
    private final com.example.ege.repositories.userRepository userRepository;

    public userService(userRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(create_user_dto userDto){
        user newUser = new user();

        newUser.setUsername(userDto.getUsername());
        newUser.setPassword(userDto.getPassword());
        newUser.setEmail(userDto.getEmail());
        userRepository.save(newUser);
    }
}
