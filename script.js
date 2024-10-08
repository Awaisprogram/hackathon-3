document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumeContent = document.getElementById('resume-content');
    var downloadButton = document.getElementById('download-resume');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        // Clear previous error messages
        var errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function (message) { return message.remove(); });
        // Validate form fields
        var isValid = validateForm();
        if (isValid) {
            // Get the form values
            var name_1 = document.getElementById('name').value;
            var title = document.getElementById('title').value;
            var email = document.getElementById('email').value;
            var about = document.getElementById('about').value;
            var education = document.getElementById('education').value;
            var workExperience = document.getElementById('work-experience').value;
            var skills = document.getElementById('skills').value.split(',');
            var address = document.getElementById('address').value;
            var languages = document.getElementById('languages').value.split(',');
            // Generate the resume HTML dynamically
            var resumeHTML = "\n      <div class=\"resume\">\n        <div class=\"header\">\n          <h1 class=\"resume-header\">".concat(name_1, "</h1>\n          <p class=\"resume-para\">").concat(title, "</p>\n          <p class=\"resume-paragraph\"><strong>Email:</strong> ").concat(email, "</p>\n        </div>\n        <h2 class=\"resume-subheader\">About</h2>\n        <p class=\"resume-inputs\">").concat(about, "</p>\n        <h2 class=\"resume-subheader\">Education</h2>\n        <p class=\"resume-inputs\">").concat(education, "</p>\n        <h2 class=\"resume-subheader\">Work Experience</h2>\n        <p class=\"resume-inputs\">").concat(workExperience, "</p>\n        <h2 class=\"resume-subheader\">Skills</h2>\n        <ul>\n          ").concat(skills.map(function (skill) { return "<li class=\"resume-list-item\">".concat(skill.trim(), "</li>"); }).join(''), "\n        </ul>\n        <h2 class=\"resume-subheader\">Address</h2>\n        <p class=\"resume-inputs\">").concat(address, "</p>\n        <h2 class=\"resume-subheader\">Languages</h2>\n        <ul>\n          ").concat(languages.map(function (language) { return "<li class=\"resume-list-item\">".concat(language.trim(), "</li>"); }).join(''), "\n        </ul>\n      </div>\n      ");
            // Insert the generated HTML into the resume content section
            resumeContent.innerHTML = resumeHTML;
            // Show the download button after generating the resume
            downloadButton.classList.remove('hidden');
        }
    });
    // Download Resume Functionality
    downloadButton.addEventListener('click', function () {
        var resumeData = resumeContent.innerHTML;
        var blob = new Blob([resumeData], { type: 'text/html' });
        // Create a temporary link to download the resume
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.html';
        // Programmatically trigger the download
        link.click();
    });
    // Validate Form Fields Function
    function validateForm() {
        var isValid = true;
        // Validate Name
        var name = document.getElementById('name');
        if (name.value.trim().length < 3) {
            showError(name, 'Name must be at least 3 characters long');
            isValid = false;
        }
        // Validate Email
        var email = document.getElementById('email');
        if (!email.value.includes('@') || !email.value.includes('.')) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }
        // Validate Education
        var education = document.getElementById('education');
        if (education.value.trim().length < 10) {
            showError(education, 'Education details must be at least 10 characters long');
            isValid = false;
        }
        // Validate Work Experience
        var workExperience = document.getElementById('work-experience');
        if (workExperience.value.trim().length < 10) {
            showError(workExperience, 'Work experience must be at least 10 characters long');
            isValid = false;
        }
        // Validate Skills
        var skills = document.getElementById('skills');
        if (skills.value.trim().length < 3) {
            showError(skills, 'Skills must be at least 3 characters long');
            isValid = false;
        }
        return isValid;
    }
    // Display Error Message Function
    function showError(input, message) {
        var error = document.createElement('div');
        error.classList.add('error-message');
        error.style.color = 'red';
        error.style.marginTop = '5px';
        error.innerText = message;
        input.insertAdjacentElement('afterend', error);
    }
});
