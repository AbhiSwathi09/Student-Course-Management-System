package com.educonnect.educonnect_backend.controller;

import com.educonnect.educonnect_backend.model.Student;
import com.educonnect.educonnect_backend.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*") // Allow all origins for testing (customize later)
public class StudentController {

    @Autowired
    private StudentService studentService;

    // ✅ Register a new student
    @PostMapping("/register")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
        Student savedStudent = studentService.registerStudent(student);
        return ResponseEntity.ok(savedStudent);
    }

    // ✅ Login with username and password
    @PostMapping("/login")
    public ResponseEntity<Student> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<Student> student = studentService.login(username, password);
        return student.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.status(401).build());
    }

    // ✅ Get student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Get student by username
    @GetMapping("/username/{username}")
    public ResponseEntity<Student> getStudentByUsername(@PathVariable String username) {
        try {
            Student student = studentService.getStudentByUsername(username);
            return ResponseEntity.ok(student);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
