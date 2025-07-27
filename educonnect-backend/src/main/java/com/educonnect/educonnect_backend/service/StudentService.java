package com.educonnect.educonnect_backend.service;

import com.educonnect.educonnect_backend.model.Student;
import com.educonnect.educonnect_backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Student registerStudent(Student student) {
        return studentRepository.save(student);
    }

    public Optional<Student> login(String username, String password) {
        Optional<Student> student = studentRepository.findByUsername(username);
        return student.filter(s -> s.getPassword().equals(password));
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public Student getStudentByUsername(String username) {
        return studentRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Student not found with username: " + username));
    }

}
