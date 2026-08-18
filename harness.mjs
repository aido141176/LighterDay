import http from "node:http";
import handler from "./.vercel/output/functions/_render.func/dist/server/entry.mjs";

const server = http.createServer(async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    res.statusCode = 500;
    res.end("HARNESS ERROR: " + (err instanceof Error ? err.stack : String(err)));
  }
});

server.listen(4324, () => console.log("prod-bundle harness on :4324"));
