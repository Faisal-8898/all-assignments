const express = require("express");
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let countId = 0;

// Admin routes
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  // check already existing admin or not
  const existingAdmin = ADMINS.find((admin) => admin.username === username);

  if (existingAdmin) {
    return res.status(400).json({ error: "Usernmae already exits" });
  } else {
    const newAdmin = {
      username,
      password,
    };
    ADMINS.push(newAdmin);

    return res.status(200).json({ message: "Admin created successfully " });
  }
});

app.post("/admin/login", (req, res) => {
  // logic to log in admin
  const { username, password } = req.body;
  const checkAdmin = ADMINS.find((admin) => admin.username === username);
  if (checkAdmin && checkAdmin.password === password) {
    return res.status(200).json({ message: "Logged in successfully" });
  } else {
    return res.status(400);
  }
});

app.post("/admin/courses", (req, res) => {
  // logic to create a course
  const username = req.headers["username"];
  const password = req.headers["password"];
  const { title, description, price, imageLink, published } = req.body;
  const checkAdmin = ADMINS.find((admin) => admin.username === username);
  if (checkAdmin && checkAdmin.password === password) {
    countId++;
    const newCourse = {
      courseId: countId,
      title,
      description,
      price,
      imageLink,
      published,
    };
    COURSES.push(newCourse);
    return res
      .status(200)
      .json({ message: "Course created successfully", courseId: countId });
  } else {
    return res.status(404).json({ message: "Admin not exits!" });
  }
});

app.put("/admin/courses/:courseId", (req, res) => {
  // logic to edit a course
  const courseId = +req.params.courseId;
  const username = req.headers["username"];
  const password = req.headers["password"];
  const { title, description, price, imageLink, published } = req.body;
  const upCourse = COURSES.find((course) => course.courseId === courseId);
  const checkAdmin = ADMINS.find((admin) => admin.username === username);
  if (checkAdmin && checkAdmin.password === password) {
  if (upCourse){
   // Update the existing course object instead of creating a new one
  upCourse.title = title;
  upCourse.description = description;
  upCourse.price = price;
  upCourse.imageLink = imageLink;
  upCourse.published = published;

    res.status(200).json({ message: 'Course updated successfully' });
  }
  else{
    res.status(400).json({ message: 'Course not found' });
  }}
});

app.get("/admin/courses", (req, res) => {
  const username = req.headers["username"];
  const password = req.headers["password"];
  const checkAdmin = ADMINS.find((admin) => admin.username === username);
  if (checkAdmin && checkAdmin.password === password) {
  res.status(200).json(COURSES);}
  else{
    res.status(400).json({ message: 'invalid admin' });
  }

});

// User routes 
app.post("/users/signup", (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;
  // check already existing user or not
  const existingUser = USERS.find((user) => user.username === username);

  if (existingUser) {
    return res.status(400).json({ error: "Usernmae already exits" });
  } else {
    const newUser = {
      username,
      password,
    };
    USERS.push(newUser);

    return res.status(200).json({ message: "User created successfully " });
  }
});

app.post("/users/login", (req, res) => {
  // logic to log in user
});

app.get("/users/courses", (req, res) => {
  // logic to list all courses
});

app.post("/users/courses/:courseId", (req, res) => {
  // logic to purchase a course
});

app.get("/users/purchasedCourses", (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
