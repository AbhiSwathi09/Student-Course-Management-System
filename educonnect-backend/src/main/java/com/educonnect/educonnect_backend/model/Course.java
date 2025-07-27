package com.educonnect.educonnect_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.sql.Timestamp;

// >>>>>>>>>> REMOVE ALL LOMBOK IMPORTS - DO NOT COPY THEM BELOW THIS LINE <<<<<<<<<<
// import lombok.NoArgsConstructor;
// import lombok.AllArgsConstructor;
// import lombok.Data;

@Entity
@Table(name = "courses")
// >>>>>>>>>> REMOVE ALL LOMBOK ANNOTATIONS FROM HERE - DO NOT COPY THEM BELOW THIS LINE <<<<<<<<<<
// @NoArgsConstructor
// @AllArgsConstructor
// @Data
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    
    @Column(name = "duration_hours")
    private Integer durationHours;
    
    @Column(name = "instructor_name")
    private String instructorName;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;
    
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    // >>>>>>>>>> MANUAL CONSTRUCTORS (REQUIRED by JPA/Hibernate) <<<<<<<<<<

    // 1. No-argument constructor (ESSENTIAL)
    public Course() {
        // Default constructor for JPA/Hibernate
    }

    // 2. Constructor for creating new Course objects (without ID/timestamps)
    public Course(String title, String description, Integer durationHours, String instructorName, String imageUrl) {
        this.title = title;
        this.description = description;
        this.durationHours = durationHours;
        this.instructorName = instructorName;
        this.imageUrl = imageUrl;
        // createdAt and updatedAt will be set by @PrePersist callbacks
    }

    // 3. All-fields constructor (useful for full object creation if needed)
    public Course(Long id, String title, String description, Integer durationHours, String instructorName, String imageUrl, Timestamp createdAt, Timestamp updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.durationHours = durationHours;
        this.instructorName = instructorName;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }


    // >>>>>>>>>> MANUAL GETTERS AND SETTERS FOR ALL FIELDS (ESSENTIAL) <<<<<<<<<<

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDurationHours() {
        return durationHours;
    }

    public void setDurationHours(Integer durationHours) {
        this.durationHours = durationHours;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }

    // Correct Getter and Setter for imageUrl (your previous one was incorrect as it returned null Object)
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    // >>>>>>>>>> Lifecycle Callbacks (Keep these manually) <<<<<<<<<<
    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = new Timestamp(System.currentTimeMillis());
        }
        if (this.updatedAt == null) {
            this.updatedAt = new Timestamp(System.currentTimeMillis());
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Timestamp(System.currentTimeMillis());
    }
}