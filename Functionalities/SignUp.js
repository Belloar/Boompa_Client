
document.getElementById("submit-btn").addEventListener("click",async (ev)=>{
    ev.preventDefault();
   await Register()
})


async function Register(){
    const form = document.getElementById("registration-form");
    const formData = new FormData(form);

    let requestPayload = {
        "userName":`${formData.get("username")}`,
        "password":`${formData.get("password")}`,
        "email":`${formData.get("email")}`,
    }

    sessionStorage.setItem("registrationData",JSON.stringify(requestPayload))
    let result = await VerifyEmail(requestPayload.email)

    if(result.statusCode == 200){
        window.location.assign("/Pages/Verification_Page.html")
    }
    
}


async function VerifyEmail(email){
    let response = await fetch(`https://localhost:57561/api/Identity/SendVerificationCode/${email}`)

        let result = await response.json()
        if(result.statusCode == 200){
            return result
        }
        else{
            alert("Error:"+result.statusMessages)
        }
}

