const express = require('express');
const pool = require('./db');
const PORT = process.env.PORT || 3000;
const app = express();

// ejs setup
app.set('view engine', 'ejs');

const path = require('path');
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(express.json());

app.use((req, res, next)=> {
    res.on('finish', ()=>{
        console.log(`📡 [${req.method}] ${req.originalUrl} → ${res.statusCode}`)
    });
    next();
});

// Routes
// app.get('/', (req, res)=> {
//     res.render('index', {name: 'KRish'});
// });

// app.get('/users', async(req, res)=> {
//     try{
//         const result = await pool.query
//         ("UPDATE users SET age = 18 WHERE name = 'nitya';");
//         res.send('Done');
//     } catch(error){
//         console.error('Query failed:', error);
//         res.status(500).send('Server Error');
//     }
// });

// app.get('/result', async(req, res)=>{
//     const result = await pool.query
//     ("SELECT * FROM users");
//     res.json(result.rows);
// })

app.get('/users', async(req, res)=> {
    const output = await pool.query("SELECT * FROM users;");
    res.render('index', {output});
    // output.rows.forEach((row) =>{
    //     console.log(`Name: ${row.name}, Age: ${row.age}`);
    // });
});

// Start server
app.listen(PORT, () => {
  console.log(`🟢 Express app ready at http://localhost:${PORT}`);
});