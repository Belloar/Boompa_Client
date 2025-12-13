var Users 
var splitCount = 0;
var br = document.createElement("br");


function Main(){
    
}

async function CreateAdmin(){

    try{
        let form = document.getElementById("admin-creation-form")
        let formData = FormData(form)

        const response = await fetch("https://localhost:44325/api/Admin/CreateAdmin",{
            "method":"POST",
            "'headers":{
                "Authorization":`${sessionStorage.getItem("token")}`
            },
            "body":formData
            
        })

        const result = (await response).json()
        console.log(result)
    }
    catch(err){
        alert(err)
        console.log(err)
    }
    
}

async function GetAllUsers(size){
    try{

    const response = await fetch(`https://localhost:57561/api/Identity/GetUsers/${size}`)

    let result = await response.json()
    
    console.log(result.data)
    RefineUsersData(result.data)
    Users = result.data
    }
    catch(err){
        alert(err)
        console.log(err)
    }
}
function RefineUsersData(payload){
    const displayArea = document.getElementById("displayArea")

    //first split data
    let tableData = SplitData(payload,1)
    splitCount++
    DisplayUsers(tableData)
    //creating the next button
    let nextBtn = document.createElement("button")
    nextBtn.type = "button"
    nextBtn.classList.add = "pageButton"
    nextBtn.textContent = ">"
    nextBtn.addEventListener("click", () => {

        if(payload.length != 0){
            let splitData = SplitData(Users,splitCount)
            splitCount++
            DisplayUsers(splitData)

        }
    })
    //creating the previous button
    let previousBtn = document.createElement("button")
    previousBtn.type = "button"
    previousBtn.classList.add = "pageButton"
    previousBtn.textContent = "<"
    previousBtn.addEventListener("click", () => {
        if(splitCount > 0 ){
            let splitData = SplitData(Users,splitCount)
            splitCount--
            DisplayUsers(splitData)
        }
    })
    displayArea.append(previousBtn,nextBtn)
}


function DisplayUsers(payload){
    // fetch the parent node that will house the table to be displayed
    const displayArea = document.getElementById("displayArea")

    // creating the table
    const table = document.createElement("table")
    table.id = "display-table"
    let head = document.createElement("thead")
    let body = document.createElement("tbody")

    const keys = Object.keys(payload[0])
    keys.forEach(key => {
        let th = document.createElement("th")
        th.textContent = key
        head.appendChild(th)
    })

    payload.forEach(user => {
        let tr = document.createElement("tr")
        
        keys.forEach(key => {
            let td = document.createElement("td")
            let value = user[key]
            if(Array.isArray(value)){
                value = value.join(",")
            }
            if(key === "createdOn"){
                value = new Date(value).toLocaleString()
            }
            td.textContent = value
            tr.append(td)
        })

        let getBtn = document.createElement("button")
        getBtn.type = "button"
        getBtn.textContent = "Get"
        getBtn.classList.add("actionButton")
        getBtn.id = "getButton"
        getBtn.addEventListener("click", () => {
            GetLearner(user.email)
        })

        let deleteBtn = document.createElement("button")
        deleteBtn.type = "button"
        deleteBtn.textContent = "Delete"
        deleteBtn.id = "deleteButton"
        deleteBtn.classList.add("actionButton")
        deleteBtn.addEventListener("click", () => {
            DeleteUser(user.email)
        })

        tr.append(getBtn,deleteBtn)
        body.append(tr)
    })



    table.append(head)
    table.appendChild(body)
    displayArea.append(table)
}

async function GetLearner(searchString){
    try{
        const response = await fetch(`https://localhost:57561/api/Learner/GetLearner`,{
        headers:{
            "searchString":searchString,
            "Authorization":sessionStorage.getItem("token")
        }
    })
    let result = await response.json()
    return result.data
    }
    catch(err){
        alert("Error:"+err)
        console.log(err)
    }
}


async function GetAllLearners(){
    try{

    const response = await fetch("https://localhost:44325/api/Admin/GetLearners")

    let result = await response.json()
    console.log(result)
    }
    catch(err){
        alert(err)
        console.log(err)
    }
}
function DisplayLearners(payload){
    const table = document.getElementById("display-table")
    const learners = payload.forEach(learner => {
        let row = document.createElement("tr")
        let rowData = document.createElement("td")

    });
}

async function GetLearnerHistory(){}
function DisplayHistory(payload){}

async function DeleteUser(searchString){
    try{
        const response = await fetch("",{
        headers:{
            method:'DELETE',
            "Authorization":sessionStorage.getItem("token"),
            "searchString":searchString
        }
    })
    let result =  response.json()
    return result.data
    }
    catch(err){
        alert("Error"+err)
        console.log(err)
    }
}

function SplitData(payload,pageNumber){
    let users = payload
    
    let start = (pageNumber-1)*5
    
    
    let splitData = users.splice(start,start+5)

    return splitData
}




