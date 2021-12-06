/* if experiencing authentication issues, kill processes running on port 8080. 
in cmd: 
netstat -ano | findstr :8080
taskkill /PID (process id) /F

OR Set to new port.
*/

console.log("Node has thoroughly confused me \n");

const http = require("http"); //  import built in module HTTP
const port = 8081; //  pull port number into it's own variable so it can be passed in wherever needed.



function requestHandler(req, res) { //  request handler function that will receive a request and response object, pass into the callback function below
    // Routes: where are they trying to go? What are they trying to do? Need url and request method from the object.

    let url = req.url; //  destructure the function, temporarily assign to variables.
    let method = req.method;

    const chunks = []; //create array that each chunk from data events will be pushed into.

    req.on("data", (chunk) => {
        chunks.push(chunk);
    });

    req.on("end", () => {
        let reqBody = JSON.parse(Buffer.concat(chunks).toString()); // all of the chunk buffers concat into one large buffer (whole request body). Decode to a string.  Parse decoded buffer to json so it can be manipulated before passing to response body (res)

        switch (true) { //concat url and method
            case url == "/" && method == "GET":
                sendResponse(
                    res, "Home"
                );
                break;
            case url == "/about" && method == "GET":
                sendResponse(
                    res, { name: "Tanner Voss", city: "Frederick" },
                    "application/json"
                );
                break;
            case url == "/echo" && method == "POST":
                sendResponse(
                    res, { serverMsg: "Echoed from the server ", ...reqBody },
                    "application/json"
                );
                break;
            default:
                sendResponse(
                    res,
                    "Page not found <a href='/'>Try Here</a>",
                    "text/html",
                    404, // change status code
                );
        }
    });
};



function sendResponse(res, data, type = "text/html", status = 200) { // default status code to 200 and type to text/html
    let body = type.includes("json") ? JSON.stringify(data) : formatHTML(data); // response body - if type includes json, will send back stringified data otherwise, it will formatHTML with data passed in.
    res.statusCode = status;
    res.setHeader("content-type", type);
    res.write(body); // writes back whats on the body based on the type
    res.end();
}

function formatHTML(text) {
    return `<div><h1>${text}</h1></div>`
};

http
    .createServer(requestHandler) //  call function createServer with requestHandler. Returns an object. 
    .listen(port, () => console.log("Server is listening on port: " + port)); //  displays message, server listening. Gives visual cue in terminal that server is working.