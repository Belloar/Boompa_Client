
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

async function GetAllUsers(){
    try{

    const response = await fetch("https://localhost:44325/api/Identity/GetUsers")

    let result = await response.json()
    DisplayUsers(result)
    console.log(result)
    }
    catch(err){
        alert(err)
        console.log(err)
    }
}
function DisplayUsers(payload){
    const nonDisplayable = ["id","hashsalt","password"]
    const container = document.getElementById("container")
    const table = document.createElement("table")
    table.id = "display-table"
    let head = document.createElement("thead")
    let body = document.createElement("tbody")

    const keys = Object.keys(payload.data[0])
    keys.forEach(key => {
        let th = document.createElement("th")
        th.textContent = key
        head.appendChild(th)
    })

    const users = payload.data
    users.forEach(user => {
        let tr = document.createElement("tr")
        for(let field in user){
            var td = document.createElement("td")
            td.textContent = user[field]
            tr.appendChild(td)
            
        }
        body.appendChild(tr)
    });

    table.append(head)
    table.appendChild(body)

    container.appendChild(table)
    
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

async function FetchReports(){}
function DisplayReports(){}

async function SuspendUser(){}
async function DeleteUser(){}



