document.getElementById('project-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const projectFile = document.getElementById('project-file').files[0];
    const comments = document.getElementById('comments').value;

    if (projectFile) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const fileContent = event.target.result;
            
            const project = {
                fileContent: fileContent,
                comments: comments
            };

            fetch('https://059b1ee9-ce33-4b95-8cd6-3b8468c167f0-00-3adhzxokdlz4g.worf.replit.dev/saveProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Projeto salvo no servidor com sucesso!');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Erro ao salvar o projeto no servidor.');
            });
        };
        
        reader.readAsDataURL(projectFile);
    } else {
        const project = {
            comments: comments
        };

        fetch('/saveProject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Comentários salvos no servidor com sucesso!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Erro ao salvar os comentários no servidor.');
        });
    }
});
