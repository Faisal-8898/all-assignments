import fs from "fs";

export let ADMINS = readAdminsData();
export let COURSES =readCoursesData();

// Read data from file, or initialize to empty array if file does not exist


function readAdminsData() {
    try {
        return JSON.parse(fs.readFileSync('admins.json','utf-8'));
    } catch {
        return [];
    }
}


function readCoursesData() {
    try {
        return JSON.parse(fs.readFileSync('courses.json','utf-8'));
    } catch {
        return [];
    }
}


