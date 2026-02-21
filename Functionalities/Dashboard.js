document.getElementById("contest-pointer").addEventListener("click",() => {
    location.assign("/pages/ContestDashboard.html")
})
async function GetCategories(){
    const request = await fetch()
}
async function GetLearnerStats(){
    const request = await fetch("/api/learner-stats",{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`${sessionStorage.getItem("token")}`
        }
})
    const response = await request.json();
    console.log(response)
}