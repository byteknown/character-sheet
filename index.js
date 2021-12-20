const express = require('express');
const expressHandlebars = require('express-handlebars');
const hb = expressHandlebars.create({defaultLayout: "main"});
const path = require('path');
const router = require('./routes/routes.js');

const override = require('method-override');

const app = express();

app.engine('handlebars', hb.engine);
app.set('view cache', true);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));

app.use(override((req, res)=> {
    if (req.body && typeof req.body === 'object' && 'metodo' in req.body) {
    const method = req.body.metodo;
    delete req.body.metodo;
    return method
    }
}))

app.use(express.static(path.join( __dirname, 'public')));

app.use("/", router); 

app.listen(3000, ()=>{console.log("Escuchando por el puerto 3000")});
