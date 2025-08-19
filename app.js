const express = require("express");
const app = express();
const path = require("node:path");
const PORT = 3000;
// the following is for the syling
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
// set path for ejs views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// middle code for form
app.use(express.urlencoded({ extended: true }));

// mock database
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Message Board",
    messages: messages,
    link: { text: "New Message", href: "new" },
  });
});

app.get("/new", (req, res) => {
  res.render("form");
});

app.post("/new", (req, res) => {
  const messageText = req.body.messageText;
  const messageUser = req.body.messageUser;

  messages.push({ text: messageText, user: messageUser, added: new Date() });
  // send user back to index after submiting
  res.redirect("/");
});

// start the server
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
