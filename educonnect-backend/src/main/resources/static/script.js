console.log("script.js has started executing!");

// Base URL for your Spring Boot API
const API_BASE_URL = 'http://localhost:8080/api/courses';

/**
 * Fetches all courses from the backend API and renders them.
 */
async function getAllCourses() {
    console.log(`Attempting to fetch all courses from: ${API_BASE_URL}`);
    try {
        const response = await fetch(API_BASE_URL);

        // Check if the response was successful (status code 200-299)
        if (!response.ok) {
            // If response is not OK, throw an error with the status
            const errorText = await response.text(); // Get raw error message
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const courses = await response.json();
        console.log("All Courses fetched successfully:", courses);
        renderCourses(courses); // Call renderCourses with the fetched data

    } catch (error) {
        console.error("Error fetching courses:", error);
        // Display a user-friendly error message on the page
        const coursesContainer = document.getElementById('courses-container');
        if (coursesContainer) {
            coursesContainer.innerHTML = '<p style="color: red;">Failed to load courses. Please try again later or check the server.</p>';
        }
    }
}

/**
 * Renders the given array of course objects into the HTML as structured cards.
 * @param {Array<Object>} courses - An array of course objects to display.
 */
function renderCourses(courses) {
    // IMPORTANT: Make sure this ID matches the <div> in your home.html
    const coursesContainer = document.getElementById('courses-container'); 
    if (!coursesContainer) {
        console.error("HTML element with ID 'courses-container' not found!");
        return; // Exit if the container is not found
    }

    coursesContainer.innerHTML = ''; // Clear any previous content (like "Loading courses...")

    if (courses && courses.length > 0) {
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card'); // Add class for CSS styling

            // Placeholder image URL - change this to a real image if you have one in your assets folder
            // Example: const placeholderImage = 'assets/course_placeholder.jpg';
            const placeholderImage = 'https://via.placeholder.com/300x200.png?text=Course+Image'; 

            courseCard.innerHTML = `
                <img src="${placeholderImage}" alt="Image for ${course.title}" class="course-image">
                <div class="card-content">
                    <h3>${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    <div class="course-details">
                        <p><strong>Instructor:</strong> ${course.instructorName}</p>
                        <p><strong>Duration:</strong> ${course.durationHours} hours</p>
                    </div>
                    <div class="card-actions">
                        <button onclick="handleEditCourse(${course.id})" class="edit-button">Edit</button>
                        <button onclick="handleDeleteCourse(${course.id})" class="delete-button">Delete</button>
                    </div>
                </div>
            `;
            coursesContainer.appendChild(courseCard);
        });
    } else {
        // Display a message if no courses are available
        coursesContainer.innerHTML = '<p>No courses available at the moment.</p>';
    }
}

/**
 * Placeholder function for handling course edits.
 * You'll implement the actual edit logic later.
 * @param {number} courseId - The ID of the course to edit.
 */
function handleEditCourse(courseId) {
    console.log(`Edit button clicked for Course ID: ${courseId}`);
    alert(`Implement edit functionality for Course ID: ${courseId}`);
    // Example: redirect to an edit page or open a modal
    // window.location.href = `edit-course.html?id=${courseId}`;
}

/**
 * Placeholder function for handling course deletions.
 * You'll implement the actual delete logic later.
 * @param {number} courseId - The ID of the course to delete.
 */
function handleDeleteCourse(courseId) {
    console.log(`Delete button clicked for Course ID: ${courseId}`);
    if (confirm(`Are you sure you want to delete course with ID: ${courseId}?`)) {
        alert(`Implement actual delete API call for Course ID: ${courseId}`);
        // Example: Call a function to send a DELETE request to your backend
        // deleteCourseFromBackend(courseId);
    }
}

// --- Event Listener for Page Load ---
// This ensures the script runs only after the entire HTML document has been loaded.
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded - Attempting to fetch courses...");
    getAllCourses(); // Fetch and display courses when the page loads
});