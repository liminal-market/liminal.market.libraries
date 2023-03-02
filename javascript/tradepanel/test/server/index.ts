let http = require("http");
import fs from "fs";

export const startServer = () => {
  let handleRequest = (request: any, response: any) => {
    console.log(request.url);

    switch (request.url) {
      case "/":
        processRequest(response, "/test/server/index.html", "text/html");
        break;
      case "/app/js/bundle.umd.js":
        processRequest(response, "/app/js/bundle.umd.js", "text/javascript");
        break;
      default:
        processRequest(response, request.url, "text/html");
        break;
    }
  };
  return http.createServer(handleRequest).listen(8000);
};
function processRequest(response: any, file: string, contentType: string) {
  response.writeHead(200, {
    "Content-Type": contentType,
  });
  fs.readFile(process.cwd() + file, null, function (error, data) {
    if (error) {
      console.log(error);

      response.writeHead(404);
      response.write("Whoops! File not found!");
    } else {
      response.write(data);
    }
    response.end();
  });
}
