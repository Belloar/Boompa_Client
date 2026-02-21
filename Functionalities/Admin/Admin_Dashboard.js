document.addEventListener("DOMContentLoaded",() => {
    AdminNavigation()
    
})

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


function AdminNavigation(){
  let content = `
  <nav class="admin-nav">
    <ul class="admin-nav-list">
      <li class="admin-nav-item"><a href="/Pages/wiz-ee-wig.html">Create Content(WYSIWYG) </a></li>
      <li class="admin-nav-item"><a href="/Pages/Admin/Content_Creation.html">Create Content(Casual) </a></li>
      <li class="admin-nav-item"><a href="/Pages/Admin/DisplayUsers.html">Get Learners</a></li>
    </ul>
  </nav>

  <style>
    .admin-nav{
      max-width: 20%;
      background-color: #1a3e5e;
    }

    .admin-nav-list{
      display: flex;
      flex: 1;
      justify-content: flex-start;
      flex-direction: column;
      list-style: none;
    }

    .admin-nav-item{
      margin: 5px;
      padding: 10px;
    }

      .admin-nav-item:hover{
        background-color: var(--primary-button-color);
        border-radius: 10px;
      }

    a{
      text-decoration: none;
      color: white;
      font-size: 25px;
    }
  </style>
  `
  document.body.insertAdjacentHTML("afterbegin",content)
}