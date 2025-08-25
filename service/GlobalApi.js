// import axios from "axios";
// // const {default:axios} = require("axios");

// const API_KEY = import.meta.env.VITE_STRAPI_API_KEY; 
// const axiosClient = axios.create({
//     baseURL: "http://localhost:1337/api/", 
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${API_KEY}`, 
//     }
// })

// const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);


// const GetUserResumes=(userEmail)=>axiosClient.get('/user-resumes?filters[userEmail] [$eq]='+userEmail);


// const UpdateResumeDetail=(id,data)=>axiosClient.put('/user-resumes/'+id,data);

// export default {
//     CreateNewResume,
//     GetUserResumes,
//     UpdateResumeDetail
// }


import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
    baseURL: "http://localhost:1337/api/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
    }
});

// Create new resume
const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);

// Get user resumes
const GetUserResumes = (userEmail) => axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);

// Update resume details
const UpdateResumeDetail = (id, data) => axiosClient.put(`/user-resumes/${id}`, data)
    .then(response => response.data)
    .catch(error => {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    });

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail
};
