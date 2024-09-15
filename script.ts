document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('resume-form') as HTMLFormElement;
  const resumeContent = document.getElementById('resume-content') as HTMLDivElement;
  const downloadButton = document.getElementById('download-resume') as HTMLButtonElement;

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Clear previous error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());

    // Validate form fields
    const isValid = validateForm();

    if (isValid) {
      // Get the form values
      const name = (document.getElementById('name') as HTMLInputElement).value;
      const title = (document.getElementById('title') as HTMLInputElement).value;
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const about = (document.getElementById('about') as HTMLTextAreaElement).value;
      const education = (document.getElementById('education') as HTMLTextAreaElement).value;
      const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
      const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');
      const address = (document.getElementById('address') as HTMLTextAreaElement).value;
      const languages = (document.getElementById('languages') as HTMLInputElement).value.split(',');

      // Generate the resume HTML dynamically
      const resumeHTML = `
      <div class="resume">
        <div class="header">
          <h1 class="resume-header">${name}</h1>
          <p class="resume-para">${title}</p>
          <p class="resume-paragraph"><strong>Email:</strong> ${email}</p>
        </div>
        <h2 class="resume-subheader">About</h2>
        <p class="resume-inputs">${about}</p>
        <h2 class="resume-subheader">Education</h2>
        <p class="resume-inputs">${education}</p>
        <h2 class="resume-subheader">Work Experience</h2>
        <p class="resume-inputs">${workExperience}</p>
        <h2 class="resume-subheader">Skills</h2>
        <ul>
          ${skills.map(skill => `<li class="resume-list-item">${skill.trim()}</li>`).join('')}
        </ul>
        <h2 class="resume-subheader">Address</h2>
        <p class="resume-inputs">${address}</p>
        <h2 class="resume-subheader">Languages</h2>
        <ul>
          ${languages.map(language => `<li class="resume-list-item">${language.trim()}</li>`).join('')}
        </ul>
      </div>
      `;

      // Insert the generated HTML into the resume content section
      resumeContent.innerHTML = resumeHTML;

      // Show the download button after generating the resume
      downloadButton.classList.remove('hidden');
    }
  });

  // Download Resume Functionality
  downloadButton.addEventListener('click', () => {
    const resumeData = resumeContent.innerHTML;
    const blob = new Blob([resumeData], { type: 'text/html' });

    // Create a temporary link to download the resume
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.html';

    // Programmatically trigger the download
    link.click();
  });

  // Validate Form Fields Function
  function validateForm(): boolean {
    let isValid = true;

    // Validate Name
    const name = document.getElementById('name') as HTMLInputElement;
    if (name.value.trim().length < 3) {
      showError(name, 'Name must be at least 3 characters long');
      isValid = false;
    }

    // Validate Email
    const email = document.getElementById('email') as HTMLInputElement;
    if (!email.value.includes('@') || !email.value.includes('.')) {
      showError(email, 'Please enter a valid email');
      isValid = false;
    }

    // Validate Education
    const education = document.getElementById('education') as HTMLTextAreaElement;
    if (education.value.trim().length < 10) {
      showError(education, 'Education details must be at least 10 characters long');
      isValid = false;
    }

    // Validate Work Experience
    const workExperience = document.getElementById('work-experience') as HTMLTextAreaElement;
    if (workExperience.value.trim().length < 10) {
      showError(workExperience, 'Work experience must be at least 10 characters long');
      isValid = false;
    }

    // Validate Skills
    const skills = document.getElementById('skills') as HTMLInputElement;
    if (skills.value.trim().length < 3) {
      showError(skills, 'Skills must be at least 3 characters long');
      isValid = false;
    }

    return isValid;
  }

  // Display Error Message Function
  function showError(input: HTMLElement, message: string) {
    const error = document.createElement('div');
    error.classList.add('error-message');
    error.style.color = 'red';
    error.style.marginTop = '5px';
    error.innerText = message;
    input.insertAdjacentElement('afterend', error);
  }
});
