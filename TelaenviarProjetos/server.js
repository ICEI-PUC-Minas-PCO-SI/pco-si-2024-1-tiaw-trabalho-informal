const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Endpoint para salvar o projeto
app.post('/saveProject', (req, res) => {
    const project = req.body;

    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        const projects = JSON.parse(data);
        projects.projects.push(project);

        fs.writeFile('db.json', JSON.stringify(projects, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Failed to save project' });
            }

            res.status(200).json({ message: 'Project saved successfully', project: project });
        });
    });
});

// Endpoint para listar os projetos
app.get('/projects', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        const projects = JSON.parse(data);
        res.status(200).json(projects);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
