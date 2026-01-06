var count = 0;
let level = "1"
let flag = false
document.getElementById("startBtn").addEventListener("click",()=>{
    flag = true
    Main()
})

document.getElementById("leveler").addEventListener("change",(ev) => {
    level = ev.target.value
    console.log(level)
})
document.getElementById("stopBtn").addEventListener("click",()=>{
    flag = false
})


function Main(){
    switch (level) {
        case "1":
            Level1()
            break;
        case "2":
            Level2()
            break;
        case "3":
            Level3()
            break;
        case "4":
            Level4()
            break;
        case "5":
            Level1()
            break;
        default:
            break;
    }
}

function Level1(){
    SpeedPlay(10,10,1,5)
    startBtn.remove()
}
function Level2(){
    let instruction = document.getElementById("instruction")
    let level = document.getElementById("theLevel")
    

    instruction.textContent = "Add all the Numbers displayed in the frame below"
    level.textContent = "Level 2"
    
        SpeedPlay(10,99,2,5)
        startBtn.remove()
    
}
function Level3(){
    let instruction = document.getElementById("instruction")
    let level = document.getElementById("theLevel")

    instruction.textContent = "complete the operations displayed in the frame below,you have 5 seconds to provide your answer after the numbers have been displayed"
    level.textContent = "Level 3"
    
    SpeedPlay(10,10,3,5)
    startBtn.remove()
}
function Level4(){
    let instruction = document.getElementById("instruction")
    let level = document.getElementById("theLevel")

    instruction.textContent = "complete the operations displayed in the frame below,you have 5 seconds to provide your answer after the numbers have been displayed"
    level.textContent = "Level 4"

    SpeedPlay(10,99,4,5)
    startBtn.remove()
}
function Level5(){

}

async function SpeedPlay(arraySize,maxNum,level,rounds){
    document.getElementById("stopBtn").style.display = "block"
     //declaring necessary variables
    let correct = 0
    let wrong = 0
    let round = 1
    while(round<=rounds && flag == true){
        //generate random numbers to work on
        let digits = DigitGenerator(arraySize,maxNum)

        //calculate and return the result of the operations carried out
        let result = Calculate(digits,level)

        console.log(result)
        //display digit to learner
        await Display(digits,level)

        //get learner's answer
        let answer = await CollectAnswer()
        round++
        let input = document.querySelector(".answer")
        input.remove()
        if(answer==null || answer == undefined){
            alert(`invalid input...correct answer is ${result} `)
        }
        if(result == answer){
            alert("correct")
            correct++
        }
        else{
            alert(`wrong... correct answer is ${result}`)
            wrong++
        }
    }
    
}

function Calculate(numbers,level){
    let result = 0
    switch(level) {
        case 1:
            numbers.forEach(number =>{
                result+=number
            })
            break;
        case 2:
            numbers.forEach(number =>{
                result+=number
            })
            break;
        case 3:
            numbers.forEach((number,i) => {
                if(i%3 == 0 && i!=0)
                {
                    result*=number
                }
                else{
                    result+=number
                }
            });
            break;

        case 4:
            numbers.forEach((number,i) => {
                if(i%3 == 0&& i!=0)
                {
                    result*=number
                }
                else{
                    result+=number
                }
            });
        default:
            break;
    }
    return result;
}

function Delay(duration){
    duration*=1000
    return new Promise(resolve => setTimeout(resolve,duration))
}
async function Display(numbers,level){
    let display = document.getElementById("displayElement")
    display.classList.add("fade","show")
    // console.log(numbers)

    let answer = 0
    switch (level) {
        case 1:
            for(i = 0;i< numbers.length;i++){
                display.classList.remove("show")
                display.textContent = numbers[i]

                void display.offsetWidth
                display.classList.add("show")
                await Delay(1)
            }
            
            break;

        case 2:
            for(i = 0;i< numbers.length;i++){
                display.classList.remove("show")
                display.textContent = numbers[i]

                void display.offsetWidth
                display.classList.add("show")
                await Delay(1)
            }
            
            break;
        case 3:
            for(i = 0;i< numbers.length;i++){
            if(i%3 == 0 && i!=0)
                {
                    display.classList.remove("show")
                    display.textContent = `x ${numbers[i]}`

                    void display.offsetWidth
                    display.classList.add("show")
                    await Delay(1)
                }
                else{
                    display.classList.remove("show")
                    display.textContent = `+ ${numbers[i]}`

                    void display.offsetWidth
                    display.classList.add("show")
                    await Delay(1)
                }
           }
            
            break;

        case 4:
           for(i = 0; i< numbers.length;i++){
            if(i%3 == 0&& i!=0)
                {
                    display.classList.remove("show")
                    display.textContent = `x ${numbers[i]}`

                    void display.offsetWidth
                    display.classList.add("show")
                    await Delay(1)
                }
                else{
                    display.classList.remove("show")
                    display.textContent = `+ ${numbers[i]}`

                    void display.offsetWidth
                    display.classList.add("show")
                    await Delay(1)
                }
           }
            
            break;
        default:
            break;
        }
        return answer
}

function DigitGenerator(arraySize,maxNum){
    let result = []
    for(i = 0; i<arraySize;i++){
        let digit = Math.ceil(Math.random() *maxNum)
        result.push(digit)
    }
    return result
}

async function CollectAnswer(){
    let container = document.getElementById("container")

    //input field the answer will be inputed by the learner
    let input = document.createElement("input")
    input.placeholder = "Input your Answer"
    input.required = true
    input.type = "number"
    input.classList.add("answer")
    
    
    container.append(input)
    input.focus()
    await Delay(5)
    return input.value
}

function ComputeRewards(){

}
async function DocumentVisit(){
    
}






////////////////////////////////////
/////points of imorovement/////////
//////////////////////////////////

// find a way to reconcile the methods used for speedplay and conceptpractice

