
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    // Then proceed with your fetch request


    function User(username,email){
        this.UserName = username,
        this.Email= email
    }
    const newUser = new User();
 async function Login(searchString,password){
    let response = await fetch(`https://localhost:44325/api/Identity/UserLogin/`,
            {
                method:'GET',
                headers:{
                    "Content-Type":"Application/json",
                    "username":`${searchString}`,
                    "password":`${password}`
                }
            
            })
    const result = await response.json();
    return result.data;

}



async function DummyFunc(){
    const token = await Login("bello_ar","0000");
    
    let response = await fetch("https://localhost:44325/api/Identity/JwtTest",{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        
    });

    console.log(await response.text()) ;
}

document.getElementById("register-button").addEventListener("submit",Register)
async function Register(){
    const form = document.getElementById("registration-form")
    
    let formData = new FormData(form);
    
    
    let response = await fetch("https://localhost:44325/api/Learner/CreateLearner",{
        method: "POST",

        body:`${formData}`

    })
    if(!response.ok){
        return Error("A problem occured during registration")
    }
    console.log("registration successful")
    return alert("success")
    
    
}
Register();


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