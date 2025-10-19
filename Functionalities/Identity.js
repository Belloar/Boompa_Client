
    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    // Then proceed with your fetch request


    


 async function Login(event){
    event.preventDefault();
    const form = document.getElementById("login-form");
    if(!form){
        alert("form not received")
        window.location.reload();
    }
    const formData = new FormData(form);

    let searchString = formData.get("username");
    let password = formData.get("password");

    let response = await fetch(`https://localhost:44325/api/Identity/UserLogin/`,
            {
                method:'GET',
                headers:{
                    "Content-Type":"Application/json",
                    "username":`${searchString}`,
                    "password":`${password}`
                }
            
            })
            if(response.ok){
                const result = await response.json();
                sessionStorage.setItem("token",result.data);
                window.open("Boompa_Dashboard.html","_blank")
                window.close()
                
            }
            else{
                alert("Error:"+response.status)
            }
    

}

function Redirect(page){
    window.location.replace(page)
}
async function Register(event){
    event.preventDefault();
    const form = document.getElementById("registration-form");
    const formData = new FormData(form);
    

    let response = await fetch("https://localhost:44325/api/Learner/CreateLearner",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify({
            "userName":`${formData.get("username")}`,
            "password":`${formData.get("password")}`,
            "email":`${formData.get("email")}`,
            "age":`${formData.get("age")}`,
            "phoneNumber":`${formData.get("phone-number")}`
        }

    )})

        if(response.ok){
            alert(await response.text())
            window.location.replace("Boompa_Signin.html")
        }
    
}



//TestMethod()


// const zablob = new  Blob([TestMethod()])

// // Create element with <a> tag
// const link = document.createElement("a");

// // Create a blog object with the file content which you want to add to the file
// const file = new Blob([content], { type: 'text/plain' });

// // Add file content in the object URL
// link.href = URL.createObjectURL(file);

// // Add file name
// link.download = "sample.txt";

// // Add click event to <a> tag to save file.
// link.click();
// URL.revokeObjectURL(link.href);