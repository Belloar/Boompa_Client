let myname =""
function GetLearnerById(data = {}){

    fetch("https://localhost:44325/api/Learner/GetLearnerById?id=1",{

    method : 'GET',
    
    Headers : {
        'Content-Type' : 'application/json',
        'Authorization' : myname,
    },

    Body : JSON.stringify(data)
    }).then((response) => response.json()).then((result) => console.log(result))

    
};
//console.log("warri no dey carry last")


function Login(searchString,password){
    fetch("https://localhost:44325/api/Identity/UserLogin",{
        Method : 'GET',
        Headers :{
            'Content-Type' : 'application/json',
            'userName' : searchString,
            'password' : password
        }
    }).then((response) => response.json())
    .then((body) => console.log(body))
    .catch((error) => console.log(error))
}
//Login("firstadmin","5399")




function TestMethod(){
    fetch("https://localhost:44325/api/Learner/TestMethod")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
}
//TestMethod()


const zablob = new  Blob([TestMethod()])

// Create element with <a> tag
const link = document.createElement("a");

// Create a blog object with the file content which you want to add to the file
const file = new Blob([content], { type: 'text/plain' });

// Add file content in the object URL
link.href = URL.createObjectURL(file);

// Add file name
link.download = "sample.txt";

// Add click event to <a> tag to save file.
link.click();
URL.revokeObjectURL(link.href);