import express from "express";

const app = express();
const port = process.env.PORT || 3000;

const jsonBodyMiddlewere = express.json();
app.use(jsonBodyMiddlewere);

const db = {
  courses: [
    { id: 1, title: "frontend" },
    { id: 2, title: "backend" },
    { id: 3, title: "fullsteack" },
    { id: 4, title: "css" },
  ],
};

app.get("/", (req, res) => {
  res.send("IT");
});

app.get("/courses", (req, res) => {
  let foundCourses = db.courses;
  if (req.query.title) {
    foundCourses = foundCourses.filter(
      (c) => c.title.indexOf(req.query.title as string) > -1
    );
  }

  res.json(foundCourses);
});

app.get("/courses/:id", (req, res) => {
  const foundCurses = db.courses.find((c) => c.id === +req.params.id);

  if (!foundCurses) {
    res.sendStatus(404);
    return;
  }
  res.json(foundCurses);
});

app.post("/courses", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(400);
    return;
  }

  const createdCourse = {
    id: +new Date(),
    title: req.body.title,
  };

  db.courses.push(createdCourse);
  res.status(201).json(createdCourse);
});

app.delete("/courses/:id", (req, res) => {
  db.courses = db.courses.filter((c) => c.id !== +req.params.id);

  res.sendStatus(204);
});

app.put("/courses/:id", (req, res) => {
  const foundCurses = db.courses.find((c) => c.id === +req.params.id);

  if (!foundCurses) {
    res.sendStatus(404);
    return;
  }
  foundCurses.title = req.body.title;

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
