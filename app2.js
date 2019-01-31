const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    // console.log('req.url: ', req.url, ' req.method: ', req.method, ' req.headers; ', req.headers);

    // Manage Incomming data (Streams) with "Buffer"
    // It mainly gains the input message from the client

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
        return res.end();  // "return" => to stop here  
    }

    // Because a router has different methods, GET/POST
    if(req.url === '/message' && req.method === 'POST') {
        
        const body = [];

        // --------------------------------------------------------------------------------------------------------------
        // This is asynchronous function. In this structure,
        //  res.on is executed only when that method is invoked.
        //  Therefore, it is executed at the last 


        // res.on : Listen to event!!! not listen to request
        // event listener for the built-in event here.
        //      on['data'] =  () => { } // callback function
        // event registry: define the event and sends the event to the event listener
        //      emit['something] = () => { } 

        // data : the built-in event name
        // chunk : built-in parameter
        // collect streams
        // emit('data', () => ) registered 'data' event
        req.on('data', (chunk) => {

            console.log('chunk: ', chunk); // chunk:  <Buffer 6d 65 73 73 61 67 65 3d 61 66 64 61 66 61 66>
            body.push(chunk);

            console.log('body: ', body) // body:  [ <Buffer 6d 65 73 73 61 67 65 3d 61 66 64 61 66 61 66> ]
        });


        // place the streams on Buffer array
        // end: built-in event name to place the chunks in Buffer array
        
        // emit('end', () => ) registered 'end' event
        return req.on('end', () => {

            // Buffer : global object (is not be required to import)
            const parseBody = Buffer.concat(body).toString();
            console.log('parseBody: ', parseBody); // parseBody:  message=DSadASDA

            const message = parseBody.split('=')[1];


            // 1) In effective in non-block event structure
            // fs.writeFileSync('message.txt', message);

            // 2) use async
            fs.writeFile('message.txt', message, err => {

                // Define when an error occurs
                if(err) return; // stop here

                // Define correct response without the 
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end(); // do not need to specify return here when it is succefully done.
            });
           
            // This block should be here because when it finisheds making a file above
            //      it should send response to the client.
            // It depends on req.on('end') only, now.

            // Otherwise, it can be dependant on res.on('data') || res.on('end')
            //      when this block exists down below.
            // ** res.statusCode = 302;
            
            
            // redirect ****
            // ** res.setHeader('Location', '/');


            // not working here. ******************************************8
            //  because 'res.setHeader('Content-Type', 'text/html');' below 
            //      is already working
            //  In asynchronous environment in Node, 
            //      setHeader('Content') is registered in memory 
            //      prior to setHeader('Location')
            //  Therefore, it executs 'setHeader('Content')' first.
            
            //  In result, we need to put 'return' to res.on('end') to stop here
            console.log('res.statusCode'); // not working here.
            
            // can't reach out to this 'return'
            // return res.end();

            // As we implemented return in res.on('end')
            //  we do not need to use return here.
            // ** res.end();
            
        });

        // --------------------------------------------------------------------------------------------------
        
        // Moved to "res.on" 
        // res.statusCode = 302;

        // // redirect ****
        // res.setHeader('Location', '/');
        // return res.end();

    }

    // Same res.setHeader function as the one, setHeader('Location')
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
});

server.listen(3000);
