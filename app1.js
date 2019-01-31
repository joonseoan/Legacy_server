const http = require('http');

// The parameter is a callback that runs and returns value in http.js
//  that has or built by "promise"
const server = http.createServer((req, res) => {

    // ---------- [Request] ------------

    // console.log(req);

    // The most important req fields
    console.log('req.url: ', req.url, ' req.method: ', req.method, ' req.headers; ', req.headers);

    // 1) req.url : /
    // 2) req.method: GET (default)
    // 3) req.headers:     
        // (1) host; the server address / location 
        // (2) cache control
        // (3) browser (client)
        // (4) accept-encoding 'gzip
        // (5) cookie
        /***************  
            On both requests and responses, Http headers are added to transport metadata from A to B.
        ****************/

    // ---------- [RESPONSE] -------------

    // information that is sent to the client

    // inform the client the type of a content that is ultimately sent to the client
    res.setHeader('Content-Type', 'text/html');
    
    // Then sends the client the content here
    res.write(`<html>
        <head>
            <title>Practice1</title>
        </head>
        <bod>
            <h1>Hello, Node</h1>
        </body>
    </html>`); 

    // -------------------- End ----------

    res.end();


    // stop listening request and exit the running process
    // process.exit();
});

server.listen(3000);
