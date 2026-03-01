document.getElementById("verify-btn").addEventListener("click", ()=>{
    let inputCode = document.querySelector("[name='verification-code']").value
     VerifyCode(inputCode)
})


async function VerifyCode(code){
    let response = await fetch(`https://localhost:57561/api/Identity/VerifyEmail`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "email": JSON.parse(sessionStorage.getItem("registrationData")).email,
            "userInput": code
         })
    })
    let result = await response.json()
    if(result.statusCode == 200){
        await AddUser()
        alert("Verification successful! You can now log in.")
        window.location.assign("/Pages/Signin.html")
    }
    else{
        alert("Verification failed: "+result.statusMessages)
    }
}

async function AddUser(){
        let payload = JSON.parse(sessionStorage.getItem("registrationData"))
        let response = await fetch("https://localhost:57561/api/Learner/CreateLearner",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify(payload)

    })

        if(response.ok){
           let result = await response.json()
            alert(result.statusMessages)
        }
}