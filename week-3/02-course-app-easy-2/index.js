const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let countId = 0;

// unique secret key
const secretKey = 'hellomonutmivaloaso?';

function generateToken(username,role){
  const payload = {
    id: username,
    role: role,
  };

  return jwt.sign(payload, secretKey, { expiresIn: '1h' })

}

const authenticationJwt = ( req, res ,next)=>{
  const authentication = req.headers.authorization;
  if(authentication){
    const token = authentication.split(' ')[1];
    jwt.verify(token, secretKey,(err, data)=>{
      if(err){
        return res.status (403);
      }
      req.user = data.id;
      next();
    })
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const admin = req.body;
  // check already existing admin or not
  const existingAdmin = ADMINS.find((admi) => admi.username === admin.username);

  if (existingAdmin) {
    return res.status(400).json({ error: "Usernmae already exits" });
  } else {
    
    ADMINS.push(admin);
    const token = generateToken(admin.username,'admin');
    return res.status(200).json({ message: "Admin created successfully ", token });
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const {username , password} = req.headers;

  const checkAdmin = ADMINS.find((admin) => admin.username === username && admin.password === password);
  if (checkAdmin) {
    const token = generateToken(username,'admin');
    return res.status(200).json({ message: "Logged in successfully" ,token});
  } else {
    return res.status(403).json({message:"Authentication failed"});
  }

});

app.post('/admin/courses',authenticationJwt, (req, res) => {
  // logic to create a course
  const course = req.body;
  course.id = COURSES.length + 1;
  COURSES.push(course);
  res.json({ message: "Course created successfully", courseId: course.id });
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
  const courseId = +req.params.courseId;


});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
