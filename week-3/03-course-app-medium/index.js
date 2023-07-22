const express = require("express");
const fs = require("fs");
const app = express();
const jwt = require("jsonwebtoken");


const adminAuthentication = (req, res, next) => {
  const { username, password } = req.headers;

  const admin = ADMINS.find(a => a.username === username && a.password === password);
  if (admin) {
    next();
  } else {
    res.status(403).json({ message: 'Admin authentication failed' });
  }
};

const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    req.user = user;  // Add user object to the request
    next();
  } else {
    res.status(403).json({ message: 'User authentication failed' });
  }
};

app.use(express.json());
let ADMINS = [];
let USERS = [];
let COURSES = [];

try {
  ADMINS = JSON.parse(fs.readFileSync("ADMINS.json", "utf8"));
  USERS = JSON.parse(fs.readFileSync('USERS.json','utf8'));
  COURSES = JSON.parse(fs.readFileSync('COURSES.json','utf8'));

} catch {
  ADMINS = [];
  USERS = [];
  COURSES = [];
}

const jwtAuthorization= (req,res,next) =>{
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretkey, (err ,data)=>{
      if(err){
        return res.sendStatus(403);
      }
      else {
        req.user = data;
        next();
      }
    })
  }
  else {
    res.sendStatus(403);
  }
}
console.log(ADMINS);

const secretkey = 'helloTOOOO1212)(';

// Admin routes
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  const {username, password} = req.body;
  const foundAdmin = ADMINS.find((admin)=> admin.username === username);
  if(foundAdmin){
    res.status(403).json({message : 'admin already exists'});
  }
  else {
    const newAdmin = {username, password};
    ADMINS.push(newAdmin);
    fs.writeFileSync("ADMINS.json",JSON.stringify(ADMINS));
    const token = jwt.sign({username , role : 'admin'} ,secretkey, {expiresIn: '1h'} );
    res.json({message : 'Admin created successfully ',token});
  }
});

app.post("/admin/login", (req, res) => {
  // logic to log in admin/////////////////
});

app.post("/admin/courses", (req, res) => {
  // logic to create a course////////////////////////
});

app.put("/admin/courses/:courseId", (req, res) => {
  // logic to edit a course
});

app.get("/admin/courses", (req, res) => {
  // logic to get all courses
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user/////////////////
});

app.post("/users/login", (req, res) => {
  // logic to log in user//////////////////
});

app.get("/users/courses", (req, res) => {
  // logic to list all courses///////////////////
});

app.post("/users/courses/:courseId",jwtAuthorization,userAuthentication,(req, res) => {
  // logic to purchase a course
  const user = req.user;
  const courseId = +req.params.courseId;
  const course = COURSES.find( c => c.id ===courseId);
  if(course){
    if(!user.purchasedCourse){
      user.purchasedCourse = [];
    }
    else{
      user.purchasedCourse.push(course);
      fs.writeFileSync("USER.json", JSON.stringify(user));
      res.json({ message: 'Course purchased successfully' });
    }
  }
  else res.sendStatus(404);
});

app.get("/users/purchasedCourses", (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
