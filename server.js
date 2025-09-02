import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(_dirname,'public')));
app.use(express.json());


app.get('/',(req,res)=>{
    res.sendFile(path.join(_dirname,'public','login.html'));
});


app.post(('/add-food'),(req,res)=>{
    console.log(req.body);
    const {foodName,foodCalories} = req.body;
    console.log(`Food Name: ${foodName}, Calories ${foodCalories}`);
        res.send('Food Added!');
})

app.listen(port,()=> {
    console.log(`Server running on http://localhost:${port}`);
});