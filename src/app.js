const express = require("express");
const path = require("path");

const app = express();

//***serving css and views folders contained in public***
app.use(
  express.static(path.join(__dirname, "..", "/public"), { maxAge: "30d" })
);

//***serving media folder contained in public***
app.use(
  express.static(path.join(__dirname, "..", "/public", "media"), {
    maxAge: "30d"
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/", "Pig_Game_index.html"));
});
app.listen(4000);

// app.set("port", process.env.PORT || 4000);
// module.exports = app;
