// let count = 0 
let contestType = null
let flag = false
let timeSpent = []
let correct = 0
let wrong = 0

document.addEventListener("DOMContentLoaded",() => {
    contestType = sessionStorage.getItem("contestType")
    console.log(contestType)
})
document.getElementById("startBtn").addEventListener("click",() => {
    
    switch (contestType) {
        case "type1":
            flag = true
            MentalMathContest()
            break;
        case "type2":
            break;
        case "type3":
            break;
        default:
            break;
    }
})
async function MentalMathContest(rounds){
    
    
    let count = 0
    let content = 0
    

    while(count<3){
        let rand = Math.floor(Math.random()*3)
        switch (rand) {
            case 0:
                document.getElementById("displayElement").textContent = ""
                content = Percentage()
                
                await Process(content)
                break;
            case 1:
                document.getElementById("displayElement").textContent = ""
                content = Addition()

                await Process(content)
                break;
            case 2:
                document.getElementById("displayElement").textContent = ""
                content = Subtraction()

                await Process(content)
                break;
            case 3:
                document.getElementById("displayElement").textContent = ""
                content = Multiplication()

                await Process(content)
                break;
            default:
                document.getElementById("displayElement").textContent = ""
                content = Addition()

                await Process(content)
                break;
        }
        count++
    }
    console.log("C: "+correct+" W: "+wrong)
}

function BlitzContest(){

}

function HistoryContest(){}
function ScienceContest(){}
function MathPuzzleContest(){}


function Percentage(){
    let a = Rounder(GenerateNumber(1,99))
    let b = Rounder(GenerateNumber(1,999))
    let expression = `What is ${a}% of ${b}`
    let result = (a/100)*b

    const dto = {
        "expression" : expression,
        "result" : result
    }

    return dto
}

function Addition(){
    let a = GenerateNumber(1,999)
    let b = GenerateNumber(1,999)
    let expression = `${a} + ${b}`
    let result = a[0]+b[0]
    
    const dto = {
        "expression" : expression,
        "result" : result
    }
    return dto
}
function Subtraction(){
    let a = GenerateNumber(1,999)
    let b = GenerateNumber(1,500)
    let expression = `${a} - ${b}`
    let result = a-b
    
    let dto = {
        "expression" : expression,
        "result" : result
    }
    return dto
}
function Multiplication(){
    let a = GenerateNumber(1,999)
    let b = GenerateNumber(1,999)
    let expression = `${a} X ${b}`
    let result = a*b
    
    let dto = {
        "expression" : expression,
        "result" : result
    }
    return dto
}

function ChainContest(){}



function GenerateNumber(maxNum,maxDigit){
    let digits = []
    for(i = 0; i<maxNum;i++){
        let digit = Math.floor(Math.random() *maxDigit)
        digits.push(digit)
    }
    return digits
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
function Rounder(number){
    // let noughts = number.toString().length
    // let divider = Math.pow(10,Number(noughts))
    
    // return Math.round(number/divider)*divider

    // this function will be further developed when i want to implement difficulty

    return Math.round(number/10)*10
}
async function Process(rawContent){
    document.getElementById("displayElement").textContent = rawContent.expression

    let answer = await CollectAnswer()
    console.log("answer: "+rawContent.result)
    if(answer === rawContent.result){
        correct++
    }
    else{
        wrong++
    }
}
async function GetQuestions(){
    
}