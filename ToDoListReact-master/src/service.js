import axios from 'axios';

// const apiUrl = "http://localhost:5235/items"
axios.defaults.baseURL = 'http://localhost:5235/';

axios.defaults.headers.common['Content-Type'] = 'application/json'; // סוג התוכן של הבקשה
axios.defaults.timeout = 5000; // זמן המתנה מקסימלי לתגובה (במילישניות)


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
    const result = await axios.post(`/api/items`,{name: name})
    return {};
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
    const result = await axios.delete(`/api/items/${id}`)
    return result.data;
  }
};
