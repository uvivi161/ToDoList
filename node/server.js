const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware לטיפול ב-JSON
app.use(express.json());

// Endpoint GET שמחזיר את רשימת האפליקציות
app.get('/', async (req, res) => {
  // כאן תוכל להשתמש ב-Render API או ספרייה אחרת כדי לקבל את רשימת האפליקציות
  // לדוגמה, אם אתה משתמש ב-Render API, תוכל להשתמש ב-fetch או ב-axios
  // ולוודא שיש לך את המפתח API המתאים
const apiKey = rnd_6vAIYJrteQ7REArFgC1YKJS2pVXI;
//   fetch('https://api.render.com/v1/apps', {
//     headers: {
//       'Authorization': `Bearer ${process.env.RENDER_API_KEY}`
//     }
//   })
//     .then(response => response.json())
//     .then(data => {
//       res.json(data);
//     })
//     .catch(error => {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to fetch apps' });
//     });

    if(!apiKey){
        return res.status(500).json({ error: 'RENDER_API_KEY is not defined' });
    }
    axios.get('https://api.render.com/v1/apps',{
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    }).then(response => {
        res.json(response.data);
    }).catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch apps' });
    });
});

// הפעלת השרת
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});