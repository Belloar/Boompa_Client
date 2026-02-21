const leaderboardBody = document.getElementById("leaderboard-body");
const loadingText = document.getElementById("loading");
const errorText = document.getElementById("error");

document.addEventListener("DOMContentLoaded", () => {
    GetRecords()
})


async function GetRecords(){
    try {
        let request = await fetch("https://localhost:57561/api/Contest/GetAllRecords",{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`${sessionStorage.getItem("token")}`
        }
    })

    let response = await request.json()

    //  if (!response.ok) {
    //         throw new Error("Failed to fetch leaderboard");
    //     }
    console.log(response.data)

    loadingText.style.display = "none";
    RenderLeaderboard(response)

    } 
    catch (error) {
        console.log("error: "+error)
        loadingText.style.display = "none";
        errorText.textContent = error.message;
    }

}

function RenderLeaderboard(players) {
    leaderboardBody.innerHTML = "";

    players.forEach((player, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.userName}</td>
            <td>${player.speedAccuracyRatio}</td>
            <td>${player.numberOfRounds}</td>
        `;

        leaderboardBody.appendChild(row);
    });
}
