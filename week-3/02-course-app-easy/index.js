const express = require("express");
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let countId = 0;

const adminAuthentication = (req, res, next) => {
  const { username, password } = req.headers;

  const admin = ADMINS.find(
    (adminn) => adminn.username === username && adminn.password === password
  );
  if (admin) {
    next();
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
};

const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers;

  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    next();
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
};
// Admin routes
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  // const { username, password } = req.body;
  const newAdmin = req.body;
  // check already existing admin or not
  const existingAdmin = ADMINS.find(
    (admin) => admin.username === newAdmin.username
  );

  if (existingAdmin) {
    return res.status(403).json({ error: "Admin already exits" });
  } else {
    ADMINS.push(newAdmin);
    return res.status(200).json({ message: "Admin created successfully " });
  }
});

app.post("/admin/login", adminAuthentication, (req, res) => {
  // logic to log in admin
  res.json({ message: "Logged in successfully" });
});

app.post("/admin/courses", adminAuthentication, (req, res) => {
  const course = req.body;
  countId++;
  course.id = countId;
  COURSES.push(course);
  res.json({ message: "Course created successfully", courseId: course.id });
});

app.put("/admin/courses/:courseId", adminAuthentication, (req, res) => {
  // logic to edit a course
  const courseId = +req.params.courseId;
  const upCourse = COURSES.find((course) => course.courseId === courseId);
  if (upCourse) {
    Object.assign(upCourse, req.body);
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

app.get("/admin/courses", adminAuthentication, (req, res) => {
  res.json({ courses: COURSES });
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
  const newUser = { ...req.body, purchasedCourse: [] };
  // check already existing user or not
  const existingUser = USERS.find((user) => user.username === newUser.username);

  if (existingUser) {
    return res.status(400).json({ error: "Usernmae already exits" });
  } else {
    USERS.push(newUser);
    return res.status(200).json({ message: "User created successfully " });
  }
});

app.post("/users/login", userAuthentication, (req, res) => {
  // logic to log in user
  res.json({ message: "logged in successfully" });
});

app.get("/users/courses", (req, res) => {
  // logic to list all courses
  res.json({ courses: COURSES.filter((c) => c.published) });
});

app.post("/users/courses/:courseId", (req, res) => {
  // logic to purchase a course
  const courseId = Number(req.params.courseId);
  const course = COURSES.find((c) => c.id === courseId && c.published);
  if (course) {
    req.user.purchasedCourse.push(course);
    res.json({ message: "Course purchased successfully" });
  } else {
    res.status(404).json({ message: "Course not found or not available" });
  }
});

app.get("/users/purchasedCourses", (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
