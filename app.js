const express = require('express');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const hb = expressHandlebars.create({defaultLayout: 'index' ,partialsDir: __dirname + '/views/partials',layoutsDir: __dirname + '/views/layouts'});
//'
const router = require('./routes/routes');


const app = express();
app.use(express.static(path.join( __dirname, "public")));
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars', hb.engine);
app.set('view cache', true);
app.set('view engine', 'handlebars');



app.use('/', router);

app.listen(3000, ()=>{
  console.log("Escuchando puerto 3000");  
})