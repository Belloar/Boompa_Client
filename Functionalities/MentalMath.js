document.addEventListener("DOMContentLoaded",(ev)=>{
    ev.preventDefault()
})
var count = 0;
function Level1(){
    sessionStorage.setItem("level",1)
    window.location.assign("/Pages/Workpage.html")
    
}
function Level2(){
    sessionStorage.setItem("level",2)
    window.location.assign("/Pages/Workpage.html")
}
function Level3(){
    sessionStorage.setItem("level",3)
    window.location.assign("/Pages/Workpage.html")
}
function Level4(){
    sessionStorage.setItem("level",4)
    window.location.assign("/Pages/Workpage.html")
}
function Level5(){
    

}

// function Calculate(numbers,level){
//     let result = 0
//     switch(level) {
//         case 1:
//             numbers.forEach(number =>{
//                 result+=number
//             })
//             break;
//         case 2:
//             numbers.forEach(number =>{
//                 result+=number
//             })
//             break;
//         case 3:
//             numbers.forEach((number,i) => {
//                 if(i%3 == 0)
//                 {
//                     result*=number
//                 }
//                 else{
//                     result+=0
//                 }
//             });
//             break;

//         case 4:
//             numbers.forEach((number,i) => {
//                 if(i%3 == 0)
//                 {
//                     result*=number
//                 }
//                 else{
//                     result+=0
//                 }
//             });
//         default:
//             break;
//     }
//     return result;
// }

// async function Delay(duration){
//     return new Promise(resolve => setTimeout(resolve,duration))
// }
// async function Display(numbers,level){
//     let display = document.getElementById("displayElement")
//     // display.classList.add("fade","show")

//     switch (level) {
//         case 1:
//             numbers.forEach(number =>{
//                 display.classList.remove("show")
//                 display.textContent = `${number}`

//                 void display.offsetWidth
//                 display.classList.add("show")
//                 Delay(1000)
//             })
//             return CollectAnswer()
//             break;
//         case 2:
//             numbers.forEach(number =>{
//                 display.classList.remove("show")
//                 display.textContent = `${number}`

//                 void display.offsetWidth
//                 display.classList.add("show")
//                 Delay(1000)
//             })
//             return CollectAnswer()
//             break;
//         case 3:
//             numbers.forEach((number,i) => {
//                 if(i%3 == 0)
//                 {
//                     display.classList.remove("show")
//                     display.textContent = `x ${number}`

//                     void display.offsetWidth
//                     display.classList.add("show")
//                     Delay(1000)
//                 }
//                 else{
//                     display.classList.remove("show")
//                     display.textContent = `+ ${number}`

//                     void display.offsetWidth
//                     display.classList.add("show")
//                     Delay(1000)
//                 }
//             });
//             return CollectAnswer()
//             break;

//         case 4:
//             numbers.forEach((number,i) => {
//                 if(i%3 == 0)
//                 {
//                     display.classList.remove("show")
//                     display.textContent = `x ${number}`

//                     void display.offsetWidth
//                     display.classList.add("show")
//                     Delay(1000)
//                 }
//                 else{
//                     display.classList.remove("show")
//                     display.textContent = `+ ${number}`

//                     void display.offsetWidth
//                     display.classList.add("show")
//                     Delay(1000)
//                 }
//             });
//             return CollectAnswer()
//             break;
//         default:
//             break;
//         }
// }

// function DigitGenerator(arraySize,maxNum){
//     let result = []
//     for(i = 0; i<arraySize;i++){
//         let digit = Math.ceil(Math.random() *maxNum)
//         result.push(digit)
//     }
//     return result
// }

// function CollectAnswer(){
//     let container = document.getElementById("container") 
//     let startBtn = document.getElementById("startBtn")

//     let input = document.createElement("input")
//     input.placeholder = "Input your Answer"
//     input.type = "number"
//     input.classList.add("answer")
    
//     let btn = document.createElement("button")
//     btn.type = "button"
//     btn.textContent = "Next round"
//     btn.addEventListener("click",()=>{
//         return input.value
//     })
    

//     container.replaceChild(startBtn,input)
//     container.appendChild(btn)

// }
// function ComputeRewards(){}

