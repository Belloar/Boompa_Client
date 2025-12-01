document.addEventListener("DOMContentLoaded",()=>{
    Main()
})
var count = 0;

function Main(){
    // alert("inside main")
    var key = sessionStorage.getItem("level")
    switch (key) {
        case "1":
            // alert(key)
            Level1()
            break;
    
        default:
            break;
    }
}

function Level1(){
    // alert("inside level 1")
    let correct = 0
    let wrong = 0
    let answer = 0
    let instruction = document.getElementById("instruction")
    let level = document.getElementById("theLevel")
    

    instruction.textContent = "Add all the Numbers displayed in the frame below"
    level.textContent = "Level 1"
    //alert("displayed level and instructions")

    let digits = DigitGenerator(10,10)
        //alert("digits generated")
        let result = Calculate(digits,1)
        //alert(`result = ${result}`)

        let startBtn = document.getElementById("startBtn")
        startBtn.addEventListener("click",() =>{
            // alert("about to display digits")
            answer = Display(digits,1)
        })
        
        // alert("digits displayed")

        // if(answer == null || answer == undefined){
        //     count++;
        //     if(count<5){
        //         Level1()
        //     }
        //     else{
        //         return
        //     }
        // }
        // if(result == answer){
        //     correct++; count++;

        //     if(count<5){
        //         Level1()
        //     }
        //     else{
        //         return
        //     }

        // }
        // else{
        //     wrong++
        //      count++;

        //     if(count<5){
        //         Level1()
        //     }
        //     else{
        //         return
        //     }
        // }

}
function Level2(){

}
function Level3(){

}
function Level4(){

}
function Level5(){

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
                if(i%3 == 0)
                {
                    result*=number
                }
                else{
                    result+=0
                }
            });
            break;

        case 4:
            numbers.forEach((number,i) => {
                if(i%3 == 0)
                {
                    result*=number
                }
                else{
                    result+=0
                }
            });
        default:
            break;
    }
    return result;
}

function Delay(duration){
    return new Promise(resolve => setTimeout(resolve,duration))
}
async function Display(numbers,level){
    let display = document.getElementById("displayElement")
    display.classList.add("fade","show")
    console.log(numbers)

    switch (level) {
        case 1:
            
            for(i = 0;i<numbers.length;i++){
                display.classList.remove("show")
                display.textContent = numbers[i]

                void display.offsetWidth
                display.classList.add("show")
                await Delay(1000)
            }
            return CollectAnswer()
            break;
        case 2:
            numbers.forEach(number =>{
                display.classList.remove("show")
                display.textContent = `${number}`

                void display.offsetWidth
                display.classList.add("show")
                Delay(1000)
            })
            return CollectAnswer()
            break;
        case 3:
            numbers.forEach((number,i) => {
                if(i%3 == 0)
                {
                    display.classList.remove("show")
                    display.textContent = `x ${number}`

                    void display.offsetWidth
                    display.classList.add("show")
                    Delay(1000)
                }
                else{
                    display.classList.remove("show")
                    display.textContent = `+ ${number}`

                    void display.offsetWidth
                    display.classList.add("show")
                    Delay(1000)
                }
            });
            return CollectAnswer()
            break;

        case 4:
            numbers.forEach((number,i) => {
                if(i%3 == 0)
                {
                    display.classList.remove("show")
                    display.textContent = `x ${number}`

                    void display.offsetWidth
                    display.classList.add("show")
                    Delay(1000)
                }
                else{
                    display.classList.remove("show")
                    display.textContent = `+ ${number}`

                    void display.offsetWidth
                    display.classList.add("show")
                    Delay(1000)
                }
            });
            return CollectAnswer()
            break;
        default:
            break;
        }
}

function DigitGenerator(arraySize,maxNum){
    let result = []
    for(i = 0; i<arraySize;i++){
        let digit = Math.ceil(Math.random() *maxNum)
        result.push(digit)
    }
    return result
}

function CollectAnswer(){
    let container = document.getElementById("container") 
    let startBtn = document.getElementById("startBtn")

    let input = document.createElement("input")
    input.placeholder = "Input your Answer"
    input.type = "number"
    input.classList.add("answer")
    
    let btn = document.createElement("button")
    btn.type = "button"
    btn.textContent = "Next round"
    btn.addEventListener("click",()=>{
        return input.value
    })
    

    container.replaceChild(startBtn,input)
    container.appendChild(btn)

}
function ComputeRewards(){}

