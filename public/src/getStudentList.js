const genStudentList =  async e =>{
    e.target.innerHTML = "";
    console.log("entro");
    const data = await fetch("http://localhost:3000/get-data-students");
   
    const dataJSON = await data.json();
    console.log(dataJSON[0]);
    let newOption;
    let newText;
    dataJSON.forEach(element => {
        newOption = document.createElement("option");
        newOption.setAttribute("value", element.id);
        newText = document.createTextNode(`${element.name} ${element.first_surname} ${element.second_surname}`);
        newOption.appendChild(newText);
        e.target.appendChild(newOption);
    });
}



document.getElementById("studentSelect").addEventListener("click", genStudentList);