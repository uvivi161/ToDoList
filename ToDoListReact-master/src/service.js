import axios from 'axios';

// const apiUrl = "http://localhost:5235/items"
const apiUrl = process.env.REACT_APP_API_URL
axios.defaults.baseURL =apiUrl; //'http://localhost:5235/';

axios.defaults.headers.common['Content-Type'] = 'application/json'; // סוג התוכן של הבקשה
// axios.defaults.timeout = 5000; // זמן המתנה מקסימלי לתגובה (במילישניות)


axios.interceptors.response.use(
  response =>response,
  error => {
      // אם יש שגיאה, רושמים אותה ללוג
      console.error('Error response from API:', error);
  
      // מחזירים את השגיאה כדי שהקוד יוכל להתמודד איתה
      return Promise.reject(error);
  }
);


export default {
  getTasks: async () => {
    try{
      const result = await axios.get(`/api/items`)    
      debugger;
      return result.data;
    }
    catch(error){
      console.error('Error in getTasks:', error);
    }
  },

  addTask: async(name)=>{
    if(!name){
      console.error("Task name is required")
      return;
    }
    console.log('addTask', name);
    const result = await axios.post(`/items`,{Name: name})
    return result.data;
  },

  setCompleted: async(id, isComplete)=>{
    if(!id){
      console.error("Id is required for update completed")
      return;
    }
    console.log('setCompleted', {id, isComplete})
    const result = await axios.put(`/api/items/${id}`, { isComplete: isComplete });
    return result.data;
  },

  deleteTask:async(id)=>{
    if(!id){
      console.error("Id is required for delete")
      return;
    }
    console.log('deleteTask',id)
    const result = await axios.delete(`/items/${id}`)
    return result.data;
  }
};

















// //naomi
// // import axios from 'axios';

// // const apiUrl = process.env.VARIABLE_NAME;

// // export default {
// //   getTasks: async () => {
// //     const result = await axios.get(`${apiUrl}/api/items`)    
// //     return result.data;
// //   },

// //   addTask: async(name)=>{
// //     const currentSecond = new Date().getSeconds();

// //     console.log('addTask', name)
// //     const result = await axios.post(`${apiUrl}/api/items`,{id:currentSecond,name:name, isComplete:false})    
// //     return result.data;
// //   },

// //   setCompleted: async(id, isComplete)=>{
// //     console.log('setCompleted', {id, isComplete})
// //     const result = await axios.put(`${apiUrl}/api/items/${id}`,{id,isComplete})    
// //     return result.data;
// //   },

// //   deleteTask:async(id)=>{
// //     console.log('deleteTask')
// //     const result = await axios.delete(`${apiUrl}/api/items/${id}`)    
// //     return result.data;
// //   }

  
// // };
// import axios from 'axios';

// // הגדרת כתובת ה-API כ-default
// const apiUrl = process.env.REACT_APP_API_URL; // אם יש לך משתנה סביבה כזה
// axios.defaults.baseURL = apiUrl;  // נגדיר את baseURL כ-default

// // הוספת Interceptor לתפיסת שגיאות ב-Response
// axios.interceptors.response.use(
//   (response) => {
//     // אם הכל בסדר, מחזירים את ה-response כרגיל
//     return response;
//   },
//   (error) => {
//     // אם יש שגיאה, רושמים אותה ללוג
//     console.error('Error response from API:', error);
    
//     // מחזירים את השגיאה כדי שהקוד יוכל להתמודד איתה
//     return Promise.reject(error);
//   }
// );
// /*
// axios.defaults.baseURL =process.env.REACT_APP_API_URL;


// axios.defaults.headers.post['Content-Type'] = 'application/json';


// axios.interceptors.response.use(
//     response => response,
//     error => {
//       console.error('API Error:', error.response ? error.response.data : error.message);
//       return Promise.reject(error); 
//     }
//   );

// export default axios;
// */ 
// export default {
//   getTasks: async () => {
//     const result = await axios.get(`/api/items`);
//     debugger;  // לא צריך לכתוב את ה-baseUrl כי הוא כבר הוגדר
//     return result.data;
//   },

//   addTask: async (name) => {
//     const currentSecond = new Date().getSeconds();

//     console.log('addTask', name);
//     const result = await axios.post(`/api/items`, {/*id: currentSecond,*/ Name: name, IsComplete: false});
//     return result.data;
//   },

//   setCompleted: async (id, isComplete) => {
//     console.log('setCompleted', { id, isComplete });
//     const result = await axios.put(`/api/items/${id}?iscomplete=${isComplete}`, { id, isComplete });
//     return result.data;
//   },

//   deleteTask: async (id) => {
//     console.log('deleteTask');
//     const result = await axios.delete(`/api/items/${id}`);
//     return result.data;
//   }
// };