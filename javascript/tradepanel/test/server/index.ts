import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

const options = {
  key: fs.readFileSync(__dirname + "/key.pem"),
  cert: fs.readFileSync(__dirname + "/cert.pem"),
};

export const startServer = () => {
  let handleRequest = (request: any, response: any) => {
    // console.log(request.url);

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

  return https.createServer(options, handleRequest).listen(443);
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
