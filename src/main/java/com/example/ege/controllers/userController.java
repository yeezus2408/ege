package com.example.ege.controllers;


import com.example.ege.configs.JwtCore;
import com.example.ege.models.dtos.create_user_dto;
import com.example.ege.models.dtos.get_course_dto;
import com.example.ege.models.dtos.login_dto;
import com.example.ege.models.dtos.userData_after_login;
import com.example.ege.models.user;
import com.example.ege.repositories.userRepository;
import com.example.ege.services.userService;
import com.example.ege.utils.CourseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/user")
@RequiredArgsConstructor
public class userController {
    private final userService userService;
    private final PasswordEncoder passwordEncoder;
    private final userRepository UserRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtCore jwtCore;
    private final CourseMapper courseMapper;

    @GetMapping("/signUp")
    public String signUp() {
        return "SignUp";
    }




    @PostMapping("/signUp")
    public ResponseEntity<?> createUser(@RequestBody create_user_dto dto, BindingResult bindingResult) {
        System.out.println(dto.getPassword());
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getFieldError().getDefaultMessage());
        } else {
            if(UserRepository.existsByEmail(dto.getEmail())) {
                return ResponseEntity.badRequest().body("Email Already Exists");
            }
            String encodedPassword = passwordEncoder.encode(dto.getPassword());
            dto.setPassword(encodedPassword);
            userService.createUser(dto);
            return ResponseEntity.ok("User created");
        }
    }

    @PostMapping("/signIn")
    public ResponseEntity<?> signin(@RequestBody login_dto dto) {
        Authentication auth = null;
        try {
            auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwt = jwtCore.generateToken(auth);
        user targetUser = UserRepository.findByEmail(dto.getEmail());
        userData_after_login dataDto = new userData_after_login();
        dataDto.setEmail(dto.getEmail());
        dataDto.setId(targetUser.getId());
        List<get_course_dto> coursesDto = new ArrayList<>();
        for (int i = 0; i < targetUser.getMyCourses().size(); i++) {
            courseMapper.map(targetUser.getMyCourses().get(i));
        }
        dataDto.setCourses(coursesDto);
        dataDto.setUsername(targetUser.getUsername());
        dataDto.setToken(jwt);
        return ResponseEntity.ok(dataDto);
    }


    @GetMapping("/getCurrentUser")
    public ResponseEntity<?> getCurrentUser(@RequestHeader Map<String, String> headers) {
        String jwt = null;
        user currUser = null;

        if(headers.containsKey("authorization")) {
            String authHeader = headers.get("authorization");
            if(authHeader.startsWith("Bearer ")) {
                jwt = authHeader.substring("Bearer ".length()).trim();

                try {
                    String email = jwtCore.getEmailFromToken(jwt);
                    Optional<user> userOptional = Optional.ofNullable(UserRepository.findByEmail(email));

                    if(userOptional.isPresent()) {
                        currUser = userOptional.get();
                    } else {
                        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
                    }
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bearer prefix missing");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization header missing");
        }

        if (currUser == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }


        userData_after_login dataDto = new userData_after_login();
        dataDto.setEmail(currUser.getEmail());
        dataDto.setId(currUser.getId());
        dataDto.setUsername(currUser.getUsername());
        dataDto.setToken(jwt);
        dataDto.setBalance(currUser.getBalance());
        List<get_course_dto> coursesDto = new ArrayList<>();
        for (int i = 0; i < currUser.getMyCourses().size(); i++) {
            get_course_dto mapDto = courseMapper.map(currUser.getMyCourses().get(i));
            coursesDto.add(mapDto);
        }
        dataDto.setCourses(coursesDto);
        return ResponseEntity.ok(dataDto);
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(UserRepository.findAll());
    }

}
