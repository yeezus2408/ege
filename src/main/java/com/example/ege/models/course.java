package com.example.ege.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private String name;
    private Integer price;
    private String description;
    private String status;
    private String subject;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "course_star_ratings", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "rating")
    private List<Integer> starRitings = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    private user author;

    @OneToMany(fetch = FetchType.EAGER)
    private List<lesson> lessons = new ArrayList<>();

    @OneToMany(fetch = FetchType.EAGER)
    private List<comment> comments = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_course",
            joinColumns = @JoinColumn(name = "course_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private List<user> users = new ArrayList<>();
}
