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
    console.log(result)
    }
    catch(err){
        alert(err)
        console.log(err)
    }
}
function DisplayUsers(payload){
    const table = document.getElementById("display-table")
    let tr = document.createElement("tr")
    payload.data.foreach(user => {
        for(let field in user){
            var td = document.createElement("td")
            td.textContent = user[field]
            tr.append(td)
        }
        table.appendChild(tr)
        
    })
    



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



