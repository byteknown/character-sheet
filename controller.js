const path = require('path');
const model = require('./model/model.js');

exports.getFormNewStudent = (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "formEntrada.html"));
}

exports.insertNewStudent = (req, res)=>{
    const result = model.insertNewStudent(req.body);
    res.sendFile(path.join(__dirname, "public", "formEntrada.html"));
}

exports.getFormFindCharacterSheet = (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "formFindCharacterSheet.html"));
}

exports.findCharacterSheet = async (req, res)=>{
    const dataJson = await model.findCharacterSheet(req.body.iStudentSelect);
    const parsedData = JSON.parse(dataJson);
    console.log(req.session);
    res.render("characterSheet.handlebars", {dataContext:parsedData});
}

exports.getFormFindDataStudent = (req,res) =>{
    res.sendFile(path.join(__dirname, "public", "formFindDataStudent.html"));
}

exports.findDataStudent = async (req, res) =>{
    const dataJson = await model.findCharacterSheet(req.body.idStudent);
    const parsedData = JSON.parse(dataJson);
    res.render("updateStudentForm.handlebars", {dataContext: parsedData, layout: false});
}

exports.updateStudent = async (req, res) =>{
    const result = await model.updateStudentById(req.body);
    //res.sendFile(path.join(__dirname, "public", "formFindDataStudent.html"));
    const user = req.session.user;
    const id = await model.findCharacterId(user);
    const parsedId = JSON.parse(id);
    const dataJson = await model.findCharacterSheet(parsedId.id);
    const parsedData = JSON.parse(dataJson); 
    //res.redirect("/index.html");
    res.render("characterSheet.handlebars", {dataContext:parsedData});
}

exports.getDataStudents = async (req, res)=>{
    const results = await model.getStudentData();
    //const JSONresults = JSON.stringify(results);
    res.json(results);
}


exports.login = (req, res)=> {
    console.log(req.session);
    res.sendFile(path.join(__dirname, "public", "formLogin.html"));
}

exports.checkLogin = async (req, res)=>{
    const result = await model.checkLogin(req.body.iUser, req.body.iPwd);
    let message = {};
    let loginCode = 0;//no existe el usuario
    const userExists = (result.length==1);
    let passwordOk = false;
    if (userExists) {
        passwordOk = (result[0].password == req.body.iPwd);
        loginCode = 1;//existe el usuario pero no coincide el password
    }
    if (passwordOk) loginCode = 2;//login OK
    if (loginCode==0) message.content="El usuario no existe en la base de datos";    
    if (loginCode==1) message.content="El usuario y el password no coinciden";    
    if (loginCode==0 || loginCode==1){ res.render("formLogin.handlebars", {message: message});
    }  
    else {
        const dataJson = await model.findCharacterSheet(result[0].id);
        const parsedData = JSON.parse(dataJson);
        console.log(req.session);
        req.session.user = req.body.iUser;
        req.session.role = result[0].role;
        console.log(result[0].id);
        res.render("characterSheet.handlebars", {dataContext:parsedData});
           
    }
}

exports.logout = (req, res) =>{
    req.session.destroy();
    console.log(req.session);
    res.redirect("/login");
}

exports.findDataStudent2 = async (req, res) =>{
    const user = req.session.user;
    console.log("USUARIO = " + req.session.user);
    const dataJson = await model.findCharacterSheet2(user);
    const parsedData = JSON.parse(dataJson);
    res.render("updateStudentForm.handlebars", {dataContext: parsedData, layout: false});
}