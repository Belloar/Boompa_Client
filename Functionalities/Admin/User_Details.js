function GetSelectedEmail(){
    const params = new URLSearchParams(window.location.search)
    const emailFromQuery = params.get("email")
    if(emailFromQuery){
        return emailFromQuery
    }

    return sessionStorage.getItem("selectedUserEmail")
}

function FormatValue(key, value){
    if(value === null || value === undefined || value === ""){
        return "N/A"
    }

    if(Array.isArray(value)){
        return value.length ? value.join(", ") : "N/A"
    }

    if(typeof value === "boolean"){
        return value ? "Yes" : "No"
    }

    if(typeof value === "string" && key.toLowerCase().includes("on")){
        const date = new Date(value)
        if(!Number.isNaN(date.getTime())){
            return date.toLocaleString()
        }
    }

    return String(value)
}

function RenderUserDetails(user){
    const detailsContent = document.getElementById("detailsContent")
    detailsContent.innerHTML = ""

    Object.keys(user).forEach((key) => {
        const row = document.createElement("div")
        row.className = "detail-row"

        const label = document.createElement("span")
        label.className = "detail-label"
        label.textContent = key

        const value = document.createElement("span")
        value.className = "detail-value"
        value.textContent = FormatValue(key, user[key])

        row.append(label, value)
        detailsContent.appendChild(row)
    })
}

async function GetLearner(email){
    const response = await fetch("https://localhost:57561/api/Learner/GetLearner", {
        headers: {
            "searchString": email,
            "Authorization": sessionStorage.getItem("token")
        }
    })

    if(!response.ok){
        throw new Error(`Unable to fetch user details (${response.status})`)
    }

    const result = await response.json()
    return result.data
}

async function Main(){
    const statusText = document.getElementById("statusText")
    const email = GetSelectedEmail()

    if(!email){
        statusText.textContent = "No user was selected. Go back and click Get on a user."
        return
    }

    try{
        const user = await GetLearner(email)
        if(!user){
            statusText.textContent = "User details not found."
            return
        }

        statusText.textContent = `Showing details for ${email}`
        RenderUserDetails(user)
    }
    catch(err){
        statusText.textContent = "Failed to load user details."
        console.log(err)
    }
}

document.addEventListener("DOMContentLoaded", Main)
