package com.educonnect.educonnect_backend.service;

import com.educonnect.educonnect_backend.model.Course;
import com.educonnect.educonnect_backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public Course createCourse(Course course) {
        if (course.getCreatedAt() == null) {
            course.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        }
        course.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        return courseRepository.save(course);
    }

    public List<Course> createMultipleCourses(List<Course> courses) {
        long currentTime = System.currentTimeMillis();
        for (Course course : courses) {
            if (course.getCreatedAt() == null) {
                course.setCreatedAt(new Timestamp(currentTime));
            }
            course.setUpdatedAt(new Timestamp(currentTime));
        }
        return courseRepository.saveAll(courses);
    }

    public Course updateCourse(Long id, Course courseDetails) {
        return courseRepository.findById(id).map(course -> {
            course.setTitle(courseDetails.getTitle());
            course.setDescription(courseDetails.getDescription());
            course.setDurationHours(courseDetails.getDurationHours());
            course.setInstructorName(courseDetails.getInstructorName());
            course.setImageUrl(courseDetails.getImageUrl());
            course.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            return courseRepository.save(course);
        }).orElse(null);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}
