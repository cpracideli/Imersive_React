const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Metas');
const Meta = mongoose.model('Meta');

const app = express();

app.use(express.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
})

mongoose.connect('mongodb://localhost:27017/test',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log('mongodb connection: success');
}).catch((err) =>{
    console.log("mongodb connection: error (" + err + ")");
});


app.get('/api/v1/test', async (req, res) =>{
    await Meta.find({}).then((metas) => {
        return res.json({
            error: false,
            metas
        }).catch((err) =>{
            return res.status(400).json({
                error: true,
                message: 'Metas is null'
            });
        });
    });
    return res.json({
        name: "Learn to develop"
    })
});

app.post('/api/v1/test', async (req, res) =>{
    //console.log(req.body);
    await Meta.create(req.body, (err) => {
        if(err){
            console.log(err);
            return res.status(400).json({
                error: true,
                message: "Error: Meta not created ("+ err +")"
            });
        }
    });
    return res.json({
        error: false,
        message: "Success: Meta created"
    });

    
});

app.listen(8080, () =>{
    console.log("Server runing in 8080 port: http://localhost:8080");
});