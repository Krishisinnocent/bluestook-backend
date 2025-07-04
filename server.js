const express = require('express');
const pool = require('./db');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use((req, res, next)=> {
    res.on('finish', ()=>{
        console.log(`📡 [${req.method}] ${req.originalUrl} → ${res.statusCode}`)
    });
    next();
});

app.get('/users', async(req, res)=> {
    try{
        const result = await pool.query
        ("UPDATE users SET age = 18 WHERE name = 'nitya';");
        res.send('Done');
    } catch(error){
        console.error('Query failed:', error);
        res.status(500).send('Server Error');
    }
});

app.get('/result', async(req, res)=>{
    const result = await pool.query
    ("SELECT * FROM users");
    res.json(result.rows);
})

app.listen(PORT, () => {
  console.log(`🟢 Express app ready at http://localhost:${PORT}`);
});