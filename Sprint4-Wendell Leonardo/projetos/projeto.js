const concluirBtn = document.getElementById('concluir-btn');

  function concluir(){
    const imageData = document.getElementById('image-input').files[0];
    const offer = document.getElementById('offer1').value;
    const donation = document.getElementById('donation1').value;
    const comment = document.getElementById('comment1').value;

    const projectData = {
      image: imageData,
      offer,
      donation,
      comment
    };

    const jsonData = JSON.stringify(projectData);

    localStorage.setItem('projectData', jsonData);

    console.log('Projeto salvo com sucesso!');
  };