let practiceCategory = "add&subtract"
let trigger = false
let correct = 0
let count = 0
let wrong = 0
let timeSpent = []
let requestPayload = {}
let miscObject = {}
let durationOfStay = 0

document.getElementById("practiceCategory").addEventListener("change",(ev) => {
    practiceCategory = ev.target.value
})
document.getElementById("startBtn").addEventListener("click",()=>{
    trigger = true
    SwitchPractice()
})

document.getElementById("stopBtn").addEventListener("click",()=>{
    trigger = false
    let display = document.getElementById("displayElement")
    let debris = document.querySelectorAll(".answer")
    debris.forEach(element => {
        element.remove()
    });
    console.log("stopped")
    display.textContent = ""
})
document.addEventListener("DOMContentLoaded",() => {

})

function SwitchPractice(){
    console.log(practiceCategory)
    switch (practiceCategory) {
        case "percentage":
            Percentage()
            break;
        case "add&subtract":
            AddAndSubtract()
            break;
        case "multiplication":
            Multiplication()
            break;
        default:
            break;
    }
}
async function Percentage(){
    let display = document.getElementById("displayElement")

    while(trigger){
        let a = Rounder(Math.floor(Math.random()*98))
        let b = Rounder(Math.floor(Math.random()*999))

        display.textContent = `${a}% of ${b}`
        
        let result = (a/100)*b
        let input = await CollectAnswer()

        if(result == input){
            correct++
        }
        else{
            wrong++
        }
    }

    requestPayload.CoinCount = correct*10 

        let total = 0
        timeSpent.forEach(element => { total+=element })
        requestPayload.averageTime = total/total.length
        requestPayload.ticketCount = Math.trunc(count/5)
}

async function AddAndSubtract(){
    let display = document.getElementById("displayElement")

    while(trigger){
        let a = Rounder(Math.round(Math.random()*999))
        let b = Rounder(Math.round(Math.random()*999))

        display.textContent = `${a} + ${b}`
        
        let result = a+b
        console.log(result)
        let input = await CollectAnswer()

        if(result == input){
            correct++
        }
        else{
            wrong++
        }
    }
    
    requestPayload.CoinCount = correct*10 

        let total = 0
        timeSpent.forEach(element => { total+=element })
        requestPayload.averageTime = total/total.length

        requestPayload.ticketCount = Math.trunc(count/5)
}

function CollectAnswer() {
    let startTime = Date.now()
    return new Promise(resolve => {
        const container = document.getElementById("container");

        const input = document.createElement("input");
        input.placeholder = "Input your Answer";
        input.type = "number";
        input.classList.add("answer");

        const button = document.createElement("button");
        button.textContent = "Submit";
        button.classList.add("answer")

        container.append(input, button);
        input.focus()

        button.addEventListener("click", () => {
            let stopTime = Date.now()
            let time = ((stopTime-startTime)/1000).toFixed(2)

            timeSpent.push(time)
            console.log(time)
            
            const value = parseFloat(input.value);

            input.remove();
            button.remove();

            resolve(value);
        });
        input.addEventListener("keydown",(ev) => {
            if(ev.key==="Enter"|| ev.key===" "){
                ev.preventDefault

                let stopTime = Date.now()
                timeSpent.push(stopTime-startTime)
                console.log((stopTime-startTime)/1000)
                
                const value = parseFloat(input.value);

                input.remove();
                button.remove();

                resolve(value);
            }
            
        })
    });
}

async function Multiplication(){
    let display = document.getElementById("displayElement")

    while(trigger){
        let a = Math.floor(Math.random()*98)
        let b = Rounder(Math.floor(Math.random()*999))

        display.textContent = `${a} X ${b}`
        
        let result = a*b
        console.log(result)
        let input = await CollectAnswer()

        if(result == input){
            correct++
        }
        else{
            wrong++
        }
        count++
    }
        requestPayload.CoinCount = correct*10 

        let total = 0
        timeSpent.forEach(element => { total+=element })
        requestPayload.averageTime = total/total.length
        requestPayload.ticketCount = Math.trunc(count/5)
        requestPayload.categoryId = sessionStorage.getItem("categoryid")

}
function Delay(){
    duration
    return new Promise(resolve => setTimeout(resolve,duration*=1000))
}

function Rounder(number){
    // let noughts = number.toString().length
    // let divider = Math.pow(10,Number(noughts))
    
    // return Math.round(number/divider)*divider

    // this function will be further developed when i want to implement difficulty

    return Math.round(number/10)*10
}

function ProcessRequestPayload(){

}
import { DocumentVisit } from "./Article_Consumption" 


DocumentVisit()