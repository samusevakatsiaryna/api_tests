const express = require('express');

const server = express();

server.get('/courses', (req, res) => {
    res.status(200).json({ name: 'api testing' });
});

server.get('/course', (req, res) => {
    let name = req.query.name;
    
    res.json({ id: '1', name: name });
});

server.get('/course/:id', (req, res) => {
    let id = req.params.id;
    let name;
    if(id === '1') {
        name = 'mocha';
    };
    res.json({ id: id, name: name });
});

module.exports = server;