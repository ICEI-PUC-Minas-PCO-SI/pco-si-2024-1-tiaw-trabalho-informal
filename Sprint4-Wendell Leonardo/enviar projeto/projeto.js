const form = document.getElementById('project-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const commentInput = document.getElementById('comment1');

  const file = fileInput.files[0];
  const comment = commentInput.value;

  const projectData = {
    file: file.name,
    comment: comment
  };

  localStorage.setItem('Projeto', JSON.stringify(projectData));

  window.location.reload();
});