const Express = require("express");
const app = Express();
const model = require("./config");
app.use(Express.json());
app.use(Express.static("public"));
app.set("view engine", "ejs");
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.get("/error/", (req, res, next) => {
  res.render("error");
});
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/", async (req, res) => {
  try {
    const user = await model.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (user) {
      res.render("success");
    } else {
      res.render("error");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.render("error");
  }
});

app.get("/signup/", (req, res) => {
  res.render("signup");
});
app.get("/success", (req, res) => {
  res.render("success");
});
app.post("/post", async (req, res) => {
  try {
    const user = await model.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (!user) {
      try {
        const newModel = new model({
          username: req.body.username,
          password: req.body.password,
        });
        await newModel.save();
        res.redirect("/");
      } catch (e) {
        console.log("The Error is e");
        console.log(e);
      }
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.render("error");
  }
});

app.listen(3000, () => {
  console.log("Your Server is running");
});
