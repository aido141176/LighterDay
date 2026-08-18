const http = require("node:http");

const fake = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(
    JSON.stringify({
      token: "fake.jwt.token.12345",
      user_email: "test@example.com",
      user_display_name: "Test User",
      expires_in: 3600,
    }),
  );
});
fake.listen(4444, () => console.log("fake WP on :4444"));

const origFetch = global.fetch;
global.fetch = (url, opts) => {
  const u = String(url);
  if (u.includes("amcd.com.au")) {
    return origFetch("http://localhost:4444", opts);
  }
  return origFetch(url, opts);
};
