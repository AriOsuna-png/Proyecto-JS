const express = require('express');
const app = express();

const users = [
    {id:1, usuario: 'Piedro'},
    {id:2, usuario: 'Piedro1'},
    {id:3, usuario: 'Piedro2'}
]

 app.get('/', (request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(users));
});

app.get('/api/users', (request, response) => {
    response.json(users);
})

const PORT = 3001;
app.listen(PORT, ()=>{
    console.log('servidor corriendo en el puerto'+ PORT);
});