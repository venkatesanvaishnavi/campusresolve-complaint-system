require('http')
  .createServer((req, res) => {
    console.log("REQUEST HIT");
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("WORKING");
  })
  .listen(5000, '0.0.0.0', () => {
    console.log("RUNNING ON http://127.0.0.1:5000");
  });