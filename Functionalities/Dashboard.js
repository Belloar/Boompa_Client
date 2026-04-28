let globalState = {}
let state={}
document.addEventListener("DOMContentLoaded",() => {
    LearnerNavigation();
    GetLearnerStats();
    DisplayDetails(state.Learner)
})
document.getElementById("contest-pointer").addEventListener("click",() => {
    location.assign("/pages/ContestDashboard.html")
})


async function GetFavouriteCategories(){
    const request = await fetch()
}

async function GetBookmarkedArticles(bookmarkList){
    const request = await fetch("",{
            headers:{
                Authorization:`Bearer ${sessionStorage.getItem("token")}`
            },
            body:bookmarkList
    })
    if(!request.ok){
        alert(`Error message: ${request.statusText}`)
    }

    const response = await request.json()
    if(response.statusCode == 200){
        state.Bookmarks = response.Data
    }


}






function GetLastReadArticle(){
    // I FEEL THIS SHOULD JUST POINT TO THE ARTICLE CONSUMPTION PAGE WHERE 
}

async function GetStats(){
    const request = await fetch("https://localhost:57561/api/Learner/GetLearnerInfo",{
        headers:{
            "Authorization":`Bearer ${sessionStorage.getItem("token")}`
        }
})
    const response = await request.json();
    console.log(response)
    if(response.statusCode == 200){
        state.Learner = response.data
        // localStorage.setItem("learnerStats",JSON.stringify(response.data))
    }
    else{
        alert("Error:"+response.statusMessages)
        console.log(response.statusMessages)
    }
}
async function GetNewContent(){
    let request = await fetch("ADD THE ENDPOINT URL LATER",{
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem("token")}`
                }
        })
        if(!request.ok){
            alert("Error:"+request.statusText)
            return;
        }
    let response = await request.json();
    if(response.statusCode == 200){
        state.NewContent = response.data
    }
    else{
        alert("Error:"+response.statusMessages)
        console.log(response.statusMessages)
    }
       
}

async function GetSimilarContent(){
    let request = await fetch("ADD THE ENDPOINT URL LATER",{
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem("token")}`
                }
        })
        if(!request.ok){
            alert("Error:"+request.statusText)
            return;
        }
    let response = await request.json();
    if(response.statusCode == 200){
        state.SimilarContent = response.data
    }
    else{
        alert("Error:"+response.statusMessages)
        console.log(response.statusMessages)
    }
       
}

function LearnerNavigation(){
    const html = `
        <aside class = "learner-nav">
            <ul class="learner-nav-component" id= "learner-nav-list">

                <li class="list-component image-wrapper" id="logo-wrapper">
                    <img src="/Media/freepik__playful-and-modern-minimalist-illustrations-using-__97288.png" alt="Boompa-logo" id="boompa_logo">
                </li>

                <div class="list-component"  id="nav-items-wrapper">
                    <li class="nav-item">
                        <a class="nav-link" href="/Pages/Dashboard.html">
                            <span class="" id=""></span>
                            Dashboard
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/Pages/Categories.html">
                            <span class="" id=""></span>
                            Articles
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/Pages/Profile.html">
                            <span class="" id=""></span>
                            Profile
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/Pages/Profile.html">
                            <span class="" id=""></span>
                            Bookmarks
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/Pages/Profile.html">
                            <span class="" id=""></span>
                            Log Out
                        </a>
                    </li>
                </div>
            </ul>
        </aside>
    `
    document.body.insertAdjacentHTML("afterbegin",html)
}

function DisplayDetails(learner){
    if(learner.firstName && learner.lastName != null){
    let user = document.querySelectorAll("username")
    
    user.forEach(n => {
        n.textContent = learner.firstName + learner.lastName
    })

    }

    document.getElementById("tickets").textContent = learner.ticketCount
    document.getElementById("coins").textContent = learner.coinCount
    document.getElementById("diamonds").textContent = learner.expPoints
    document.getElementById("profile-pic").src = learner.profilePicture
}