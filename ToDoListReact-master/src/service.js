import axios from 'axios';

// const apiUrl = "http://localhost:5235/items"
axios.defaults.baseURL = 'http://localhost:5235/';

axios.defaults.headers.common['Content-Type'] = 'application/json'; // סוג התוכן של הבקשה
axios.defaults.timeout = 5000; // זמן המתנה מקסימלי לתגובה (במילישניות)


axios.interceptors.response.use(
  response => {
    // כאן תוכל לשנות את התגובה, לבצע פעולות Logging, או כל דבר אחר
    console.log('Response Interceptor:', response);
    return response;
  },
  error => {
    // טיפול בשגיאות בתגובות
    console.error('Response Error:', error); // הדפסת השגיאה ללוג

    // כאן תוכל לבצע פעולות נוספות בהתאם לצורך
    // לדוגמה: הצגת הודעה למשתמש, ניסיון חוזר של הבקשה, וכו'

    return Promise.reject(error); // חשוב להחזיר את השגיאה כדי שהקוד שקרא לפונקציה יוכל לטפל בה
  }
);


export default {
  getTasks: async () => {
    try{
      const result = await axios.get(`/items`)    
      return result.data;
    }
    catch{
      console.error('Error in getTasks:', error);
    }
  },

  addTask: async(name)=>{
    if(!name){
      console.error("Task name is required")
      return;
    }
    console.log('addTask', name);
    const result = await axios.post(`/items`,{name: name})
    return {};
  },

  setCompleted: async(id, isComplete)=>{
    if(!id){
      console.error("Id is required for update completed")
      return;
    }
    console.log('setCompleted', {id, isComplete})
    const result = await axios.put(`/items/${id}`, { isComplete: isComplete });
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
