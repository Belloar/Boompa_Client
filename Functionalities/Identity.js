
    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    // Then proceed with your fetch request

document.getElementById("submit-btn").addEventListener("click", (ev)=>{
    console.log("submit button clicked")
    Login(false)
})

// document.getElementById("admin-submit-btn").addEventListener("click", (ev)=>{
//     console.log("admin submit button clicked")
//     Login(true)
// })

document.getElementById("verify-btn").addEventListener("click",async (ev)=>{
    const email = JSON.parse(sessionStorage.getItem("registrationData")).email
    await VerifyEmail(email)
})
    


 async function Login(IsAdmin){
    const form = document.getElementById("login-form");

    if(!form){
        alert("form not received")
        window.location.reload();
    }
    
    const formData = new FormData(form);

    let searchString = formData.get("username");
    let password = formData.get("password");

    let requestBody = {
                method:'GET',
                headers:{
                    "Content-Type":"Application/json",
                    "username":`${searchString}`,
                    "password":`${password}`,
                }
            }

            if(IsAdmin){
                requestBody.headers.page = "Admin" 
            }
            else{
                requestBody.headers.page="Learner"
            }

    let response = await fetch(`https://localhost:57561/api/Identity/UserLogin/`,requestBody)
            let result = await response.json()  
            if(result.statusCode == 200){
                sessionStorage.setItem("token",result.data);

                console.log(result.data)
                if(IsAdmin){
                    Redirect(true)
                }
                else{
                    window.location.assign("/Pages/Dashboard.html")
                }
            }
            else{
                alert("Error:"+result.statusMessages)
            }
    

}

function Redirect(IsAdmin){
    
    if(IsAdmin == true){
        window.location.assign("/Pages/wiz-ee-wig.html")
    }
}


async function AddUser(payload){
    let response = await fetch("https://localhost:57561/api/Learner/CreateLearner",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify(payload)

    })

        if(response.ok){
            alert(await response.text())
            window.location.replace("Signin.html")
        }
}


