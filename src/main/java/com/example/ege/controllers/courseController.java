package com.example.ege.controllers;

import com.example.ege.configs.JwtCore;
import com.example.ege.models.comment;
import com.example.ege.models.course;
import com.example.ege.models.dtos.*;
import com.example.ege.models.user;
import com.example.ege.repositories.commentRepository;
import com.example.ege.repositories.courseRepository;
import com.example.ege.repositories.userRepository;
import com.example.ege.services.courseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/course")
@RequiredArgsConstructor
public class courseController {
    private final courseService courseService;
    private final courseRepository courseRepository;
    private final commentRepository commentRepository;
    private final AuthenticationManager authenticationManager;
    private final userRepository UserRepository;
    private final JwtCore jwtCore;

    @PostMapping("/create_course")
    public ResponseEntity<?> createCourse(@RequestBody create_course_dto dto, @RequestHeader Map<String, String> headers) {
        String jwt = null;
        user currUser = null;
        if(headers.containsKey("authorization")) {
            String authHeader = headers.get("authorization");
            if(authHeader.startsWith("Bearer ")) {
                jwt = authHeader.substring("Bearer ".length()).trim();

                try {
                    String email = jwtCore.getEmailFromToken(jwt);
                    System.out.println(email);
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
        courseService.createCourse(dto, currUser);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/getCourse/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Optional<course> finded = courseRepository.findById(id);
        get_course_dto dto = new get_course_dto();
        if(!finded.isPresent()){
            return ResponseEntity.notFound().build();
        }
        dto.setId(finded.get().getId());
        dto.setName(finded.get().getName());
        dto.setDescription(finded.get().getDescription());
        dto.setPrice(finded.get().getPrice());
        dto.setAuthor_id(finded.get().getAuthor() == null ? null: finded.get().getAuthor().getId());
        dto.setLessons(finded.get().getLessons().stream()
                .map(lesson -> {
                    get_lesson_dto lDto = new get_lesson_dto();
                    lDto.setId(lesson.getId());
                    lDto.setTitle(lesson.getTitle());
                    lDto.setDescription(lesson.getDescription());
                    lDto.setContent(lesson.getContent());
                    return lDto;
                }).collect(Collectors.toList()));
        dto.setStatus(finded.get().getStatus());
        dto.setStarRiting((finded.get().getStarRitings()));

        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll(){
        List<course> courses = courseRepository.findAll();
        if(courses.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        List<get_course_dto> dto_courses = new ArrayList<>();
        for(course course : courses){
            get_course_dto dto_course = new get_course_dto();
            dto_course.setId(course.getId());
            dto_course.setName(course.getName());
            dto_course.setDescription(course.getDescription());
            dto_course.setPrice(course.getPrice());
            dto_course.setAuthor_id(course.getAuthor() == null ? null: course.getAuthor().getId());
            dto_course.setLessons(course.getLessons().stream()
                    .map(lesson -> {
                        get_lesson_dto lDto = new get_lesson_dto();
                        lDto.setId(lesson.getId());
                        lDto.setTitle(lesson.getTitle());
                        lDto.setDescription(lesson.getDescription());
                        lDto.setContent(lesson.getContent());
                        return lDto;
                    }).collect(Collectors.toList()));
            dto_course.setStatus(course.getStatus());
            dto_course.setSubject(course.getSubject());
            dto_courses.add(dto_course);
        }
        return ResponseEntity.ok().body(dto_courses);
    }

    @PostMapping("/update_course")
    public ResponseEntity<?> updateCourse(@RequestParam Long id, @RequestBody update_dto_course updateDtoCourse){
        Optional<course> finded = courseRepository.findById(id);
        if(!finded.isPresent()){
            return ResponseEntity.notFound().build();
        }
        finded.get().setName(updateDtoCourse.getName());
        finded.get().setDescription(updateDtoCourse.getDescription());
        finded.get().setPrice(updateDtoCourse.getPrice());
        finded.get().setStatus(updateDtoCourse.getStatus());
        courseRepository.save(finded.get());
        return ResponseEntity.ok().body("ok");
    }


    @PostMapping("/{courseId}/comment")
    public ResponseEntity<?> addComment(@PathVariable Long courseId, @RequestBody commentDto commentDto){
        course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Курс не найден"));
        comment newComment = new comment();
        newComment.setAuthor_username(commentDto.getAuthor());
        newComment.setContent(commentDto.getContent());
        newComment.setCourse(course);
        commentRepository.save(newComment);
        return ResponseEntity.ok().body("ok");
    }


    @GetMapping("/{courseId}/comments")
    public ResponseEntity<?> getComments(@PathVariable Long courseId){
        List<comment> comments = commentRepository.findByCourseId(courseId);
        List<commentDto> result = comments.stream()
                .map(c -> {
                    commentDto dto = new commentDto();
                    dto.setAuthor(c.getAuthor_username());
                    dto.setContent(c.getContent());
                    return dto;
                })
                .toList();
        return ResponseEntity.ok().body(result);
    }


    @PostMapping("/{courseId}/addStar")
    public ResponseEntity<?> addStar(@PathVariable Long courseId, @RequestParam Integer star){
        Optional<course> findedCourse = courseRepository.findById(courseId);
        if (!findedCourse.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        course course = findedCourse.get();
        List<Integer> stars = course.getStarRitings();
        stars.add(star);
        course.setStarRitings(stars);

        courseRepository.save(course);
        return ResponseEntity.ok().body("ok");
    }

}
