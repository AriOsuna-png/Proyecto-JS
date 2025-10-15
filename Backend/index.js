const http = require('http');
const { text } = require('stream/consumers');

const app = http.createServer((request, response)=>{
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('mi primer servidor');
});

const PORT = 3001;
app.listen(PORT, ()=>{
    console.log('servidor corriendo en el puerto'+ PORT);
});