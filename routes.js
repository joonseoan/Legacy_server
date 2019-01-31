
const fs = require('fs');

const routes = (req, res) => {

    if(req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`<html>
            <head>
                <title>Default URL</title>
            </head>
            <bod>
                <form action="/message" method="POST">
                    <input type="text" name="message">
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>`);
    
        return res.end();
    
    }
    
    if(req.url === '/message' && req.method === 'POST') {
        
        const body = [];
    
        req.on('data', (chunk) => {
    
            body.push(chunk);
    
        });
    
        return req.on('end', () => {
    
            const parseBody = Buffer.concat(body).toString();
    
            const message = parseBody.split('=')[1];
    
            fs.writeFile('message.txt', message, err => {
    
                if(err) return;
    
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end(); 
            });
                                    
        });
    
    }

    res.setHeader('Content-Type', 'text/html');
    res.write(`<html>
        <head>
            <title>Practice1</title>
        </head>
        <bod>
            <h1>Hello, Node</h1>
        </body>
    </html>`);

    res.end();

}

module.exports = routes;


