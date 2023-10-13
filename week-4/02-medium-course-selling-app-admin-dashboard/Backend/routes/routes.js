import express from "express";
import {adminLogin, adminSignUp, allCourses, createCourse} from "../controllers/controllers.js";
import authenticateJwt from "../middleware/auth-middleware.js";


const route = express.Router();

route.post('/signup', adminSignUp);
route.post('/login', adminLogin);
route.post('/course', authenticateJwt ,createCourse);
route.get('/courses',authenticateJwt, allCourses);
// route.post('/',landingPage);

export default route;
