package com.kvark900.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Size(min=2, message="Name should have at least 2 characters")
    private String name;

    @Size(min=2, message="Surname should have at least 2 characters")
    private String surname;

    @NotNull
    @Column(unique = true)
    @Size(min=2, message="Username should have at least 2 characters")
    private String username;

    @NotNull
    @Column(unique = true)
    private String email;

    @Column(length = 60)
    private String password;

    private boolean enabled;

//    @JsonBackReference
    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "users_roles",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")})
    private List<Role> roles = new ArrayList<>();

}