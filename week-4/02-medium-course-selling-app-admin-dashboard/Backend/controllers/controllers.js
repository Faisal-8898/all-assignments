import jwt from "jsonwebtoken";
import fs from "fs";
import {ADMINS} from "../database/db_array.js";
import {COURSES} from "../database/db_array.js";
import {SECRET} from "../middleware/auth-middleware.js";


export const adminSignUp = (req, res) => {
    const {username, password} = req.body;
    console.log(req.body);
    const admin = ADMINS.find(a => a.username === username);
    console.log("admin signup");
    if (admin) {
        res.status(403).json({message: 'Admin already exists'});
    } else {
        const newAdmin = {username, password};
        ADMINS.push(newAdmin);
        fs.writeFileSync('admins.json', JSON.stringify(ADMINS));
        const token = jwt.sign({username, role: 'admin'}, SECRET, {expiresIn: '10h'});
        res.json({message: 'Admin created successfully', token});
    }
};

export const adminLogin = (req, res) => {
    const {username, password} = req.headers;
    const admin = ADMINS.find(a => a.username === username && a.password === password);
    if (admin) {
        const token = jwt.sign({username, role: 'admin'}, SECRET, {expiresIn: '10h'});
        res.json({message: 'Logged in successfully', token});
    } else {
        res.status(403).json({message: 'Invalid username or password'});
    }
};


export const createCourse = (req, res) => {
    const course = req.body;
    course.id = COURSES.length + 1;
    COURSES.push(course);
    fs.writeFileSync('courses.json', JSON.stringify(COURSES));
    res.json({ message: 'Course created successfully', courseId: course.id });
};



export const allCourses = (req, res) => {
    res.json({courses: COURSES});
}



