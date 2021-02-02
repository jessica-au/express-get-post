const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const fs = require('fs');

//middleware
//this will help us use our layouts file
app.use(expressLayouts);

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs')
app.get('/', (req,res) => {
    res.send('hi there.')
})
app.get('/dinosaurs/new', (req,res)=> {
    res.render('dinosaurs/new');
})
app.get('/dinosaurs', (req,res)=> {
    let dinos = fs.readFileSync('./dinosaurs.json')
    dinos = JSON.parse(dinos)
    console.log(dinos)
    res.render('dinosaurs/index', {dinos: dinos})
})




app.get('/dinosaurs/:index', (req,res) => {
    let dinos = fs.readFileSync('./dinosaurs.json')
    dinos = JSON.parse(dinos)
    const dino = dinos[req.params.index]
    res.render('dinosaurs/show', {dino}
    )
})


app.post('/dinosaurs', (req,res)=> {
    console.log(req.body)
})



const PORT = process.env.PORT  || 8000
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})