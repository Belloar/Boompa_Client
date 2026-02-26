document.addEventListener("DOMContentLoaded",() => {
    
    LearnerNavigation();
    GetLearnerStats();
})
document.getElementById("contest-pointer").addEventListener("click",() => {
    location.assign("/pages/ContestDashboard.html")
})
async function GetCategories(){
    const request = await fetch()
}

async function GetLearnerStats(){
    const request = await fetch("https://localhost:57561/api/Learner/GetLearnerInfo",{
        headers:{
            "Authorization":`Bearer ${sessionStorage.getItem("token")}`
        }
})
    const response = await request.json();
    console.log(response)
    if(response.statusCode == 200){
        DisplayDetails(response.data)
        localStorage.setItem("learnerStats",JSON.stringify(response.data))
    }
    else{
        alert("Error:"+response.statusMessages)
        console.log(response.statusMessages)
    }
}

function LearnerNavigation(){
    const html = `
        <nav class = "learner-nav">
            <ul class = "learner-nav-list">
            <img src="/Media/freepik__playful-and-modern-minimalist-illustrations-using-__97288.png" alt="Boompa-logo" id="boompa_logo">
            <li class="nav-item"><a class="nav-link" href="/Pages/Dashboard.html">Dashboard</a></li>
            <li class="nav-item"><a class="nav-link" href="/Pages/Categories.html">Categories</a></li>
            <li class="nav-item"><a class="nav-link" href="/Pages/Profile.html">Profile</a></li>
            </ul>
        </nav>

        <style>
            .learner-nav{
                background-color: var(--alt-color);
                max-width: 20%;
                min-height: 100vh;
            }
            .learner-nav-list{
                display: flex;
                flex-direction: column;
                align-items: start;
                list-style: none;
                font-size: 20px;
            }
            .nav-item{
                margin: 20px;
                padding: 10px;
                background-color: var(--alt-color);
            }
            .nav-link{
                text-decoration: none;
                color: #ffff;
            }
            #boompa_logo{
            max-width:25%;
            }
        </style>
    `
    document.body.insertAdjacentHTML("afterbegin",html)
}

function DisplayDetails(payload){
    if(payload.firstName && payload.lastName != null){
    document.getElementById("username").textContent = payload.firstName + payload.lastName

    }

    document.getElementById("tickets").textContent = payload.ticketCount
    document.getElementById("coins").textContent = payload.coinCount
    document.getElementById("diamonds").textContent = payload.expPoints
    document.getElementById("profile-pic").src = payload.profilePicture
}