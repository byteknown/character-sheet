const query = require('./query.js');

exports.insertNewStudent = async (data) =>{
    const querySQL = `INSERT INTO student(name, first_surname, second_surname, telephone, email, description) VALUES ("${data.iName}", "${data.iFirstSurname}","${data.iSecondSurname}","${data.iPhone}","${data.iEmail}","${data.iDescription}")`;
    const results =  await query.query(querySQL);
    return results;
}

exports.findCharacterSheet = async (id) =>{
    const querySQL = `SELECT * FROM student WHERE id = ${id}`;
    const results =  await query.query(querySQL);
    return JSON.stringify(results[0]);
}

exports.updateStudentById = async (data) =>{
    const querySQL = `UPDATE student SET name="${data.iName}", first_surname="${data.iFirstSurname}", second_surname="${data.iSecondSurname}", email="${data.iEmail}", telephone="${data.iPhone}", description="${data.iDescription}" WHERE id = ${data.iIdStudent}`;
    const results =  await query.query(querySQL);
    return results;
}

exports.getStudentData = async ()=>{
    const querySQL = `SELECT id, name, first_surname, second_surname FROM student`;
    const results =  await query.query(querySQL);
    console.log(results);
    return results;
}

exports.checkLogin = async (user, password)=>{
    const querySQL = `SELECT password, role, id FROM user WHERE user= "${user}"`;
    const results = await query.query(querySQL);
    
    return results;
}

exports.findCharacterSheet2 = async (user) =>{
    const querySQL = `SELECT * FROM student WHERE id = (SELECT id FROM user WHERE user= "${user}")`;
    const results =  await query.query(querySQL);
    return JSON.stringify(results[0]);
}

exports.findCharacterId = async (user) =>{
    const querySQL = `SELECT id FROM user WHERE user= "${user}"`
    const results =  await query.query(querySQL);
    return JSON.stringify(results[0]);
}