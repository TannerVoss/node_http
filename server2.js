const http = require("http");


//using the http module, call the createServer (turns computer into http server by making http server object)
http
    .createServer(function(request, response) { // pass in a request handler callback  function to the createServer method that receives "request" and "response" objects as parameters
        let { url } = request; //Write a conditional statement that assesses the request url, and responds appropriately
        let chunks = []; //Store the chunks in an array
        request.on("data", function(chunk) { //Add an event listener to the request object that listens for the ‘data’ event to be emitted from the ReadStream
            chunks.push(chunk); //Store the chunks in an array
        });
        request.on("end", function() { //Add an event listener to the request object that listens for the ‘end’ event to be emitted from the ReadStream
            const body = Buffer.concat(chunks).toString(); //Set a new variable ‘body’ equal to Buffer.concat(array).toString()

            const wildcard = { // object “wildcard” information (anything you enjoy)
                favBeer: "Guinness",
                favSeason: "Winter",
            };

            const self = { // object detailing information about yourself
                name: "Tanner",
                height: "6 foot",
                weight: "Way too much",
                car: "Ford Ranger",
            };

            if (url === "/") { // ‘/’ - Wildcard. Respond with whatever information you wish
                response.write(JSON.stringify(wildcard)); // Use response.write() to send the right data back to the client based on the url path. Make sure to convert the JSON to string in your response.write() method.
            } else if (url === "/about") { // ‘/about’ - Respond with an object that has information about yourself
                response.write(JSON.stringify(self)); // Use response.write() to send the right data back to the client based on the url path. Make sure to convert the JSON to string in your response.write() method.
            } else if (url === "/echo") { // ‘/echo’ - Respond with an object that, a minimum, includes the request method, url and body.
                response.write(body); // read request body, return as response body
            }
            response.end(); // Make sure to end your response with .end()


        });
    })
    .listen(3000, function() { //Set your server to listen on port 3000

        console.log("Server is listening on port 3000");

    });

// initialize with node server2.js

//open localhost:3000