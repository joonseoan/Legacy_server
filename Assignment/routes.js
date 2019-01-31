const users = require('./users');

module.exports = ((req, res) => {

    const { url, method } = req;
    
    if(url === '/' && method === 'GET') {

        res.setHeader('Content-Type', 'text/html');   
        res.write(`<html>
            <head>
                <title>Assignment1_building a simple server</title>
            </head>
            <body>
                <h1>Hello, Welcome to HTTP SERVER</h1>
                <div>
                    <form action='/create-user' method='POST'>
                        <label>Enter a user name: </label>
                        <input type='text' name='username' />
                        <button type='submit'>SUBMIT</button>
                    </form>
                </div>
            </body>
        </html>`);

        return res.end();
    
    }

    if(url === '/users' && method === 'GET') {

        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <ul>     
                ${users.map(user => `<li>${user}</li>`)}
            </ul>
        `);

        return res.end();
    }

    if(url === '/create-user' && method === 'POST') {

        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {

            const parsedUser = Buffer.concat(body).toString();
            users.push(parsedUser.split('=')[1]);  

            res.setHeader('Content-Type', 'text/html');
            res.write(`New user: ${users[users.length - 1]}`);
            return res.end();
            
        });

        // it is wrong becuae it is before 'users' array is updated.
        // It is an asynchronous function.
        // res.setHeader('Content-Type', 'text/html');
        // res.write(`New user: ${users[users.length - 1]}`);
        // return res.end();
    }

});