document.addEventListener("DOMContentLoaded",() => {
    LearnerNavigation();
})
function Redirect(categoryName){
    switch(categoryName){
        case "Mental Math":
            window.location.assign("MentalMath.html")
            break;

        default:
            window.location.assign("Materials_Display.html")
            break;
    }
    
}

function PickCategory(categoryName){
    sessionStorage.setItem("category",categoryName)
    Redirect(categoryName);
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
                display: flex;
                flex-direction: column;
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
    // document.querySelector(".base-nav").insertAdjacentHTML("afterend",html)
}
