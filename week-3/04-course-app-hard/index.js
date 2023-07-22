const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const SECRET = "hekldlfhal0934";

//Define mongoose schemas

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

// Define mongoose modals
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

mongoose.connect("mongodb+srv://faisal_8898:ZfyZlmIEAHtPSEBs@cluster0.hdqxuks.mongodb.net/courses", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "courses",
});


const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Admin routes
app.post("/admin/signup", async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username});
  if (admin) {
    res.status(403).json({ message: "Admin already Exists" });
  } else {
    const obj = { username, password };
    const newAdmin = new Admin(obj);
    newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: 'Admin created successfully', token });
    
  }
});

app.post("/admin/login", async (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;
  const admin =  await Admin.findOne({username, password});
    if(admin){
      const token = jwt.sign({username , role : 'admin'},SECRET , {expiresIn : '1h'});
      res.json ({message : 'logged in Successsfully',token});
    }else{
      res.status(403).json({message:'Admin username or password is wrong'});
    }

});

app.post("/admin/courses",authenticateJwt, async (req, res) => {
  // logic to create a course
  const course = new Course(req.body);
  course.save();
  res.json({ message: 'Course created successfully', courseId: course.id });
});

app.put("/admin/courses/:courseId", authenticateJwt, async (req, res) => {
  // logic to edit a course
  const course =await Course.findByIdAndUpdate(req.params.courseId , req.body , {new : true});
  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }

});

app.get("/admin/courses", authenticateJwt, async(req, res) => {
  // logic to get all courses
  const allCourses =  await Course.find({});
  res.json({allCourses});
});

// User routes
app.post("/users/signup", async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
});

app.post("/users/login",async (req, res) => {
  // logic to log in user
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.get("/users/courses",authenticateJwt,async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({published: true});
  res.json({ courses });
});

app.post("/users/courses/:courseId",authenticateJwt, async (req, res) => {
  // logic to purchase a course
});

app.get("/users/purchasedCourses", (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
