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
    console.log("reultado del update:" + result);
    res.sendFile(path.join(__dirname, "public", "formFindDataStudent.html"));
}

exports.getDataStudents = async (req, res)=>{
    const results = await model.getStudentData();
    //const JSONresults = JSON.stringify(results);
    res.json(results);
}