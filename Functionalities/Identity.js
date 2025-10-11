
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    // Then proceed with your fetch request


    function User(username,email){
        this.UserName = username,
        this.Email= email
    }
    const newUser = new User();
 function Login(searchString,password){
     fetch(`https://localhost:44325/api/Identity/UserLogin/`,
            {
                method:'GET',
                headers:{
                    "Content-Type":"Application/json",
                    "username":`${searchString}`,
                    "password":`${password}`
                }
            
            }).then((response) => response.json())
            .then(body => console.log(body))
            .catch(error => console.log(error))
}

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJCZWxsb19hciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InJhaG1hbmJlbGxvMjAxOEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiVXNlciIsIkFkbWluIl0sImV4cCI6MTc2MDExNjAzNSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDc1IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDc1In0.P_U9bSrNizkLqaZBEkX6mQ7n1Pn-KFXvx_PxEWHoyQI"


function DummyFunc(){
    fetch("https://localhost:44325/api/Identity/JwtTest",{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        
    })
    .then((body) => body.json())
    .then(body => console.log(body))
    .catch((error) => console.log(error));
}


 //Login("bello_ar","0000");
 DummyFunc();

 //console.log(newUser.Email);






// function Register(){
//     fetch("https://localhost:44325/api/Learner/TestMethod")
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error))
// }
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