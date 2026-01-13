let count = 0 
function MentalMathContest(){
    
}

function BlitzContest(){

}

function HistoryContest(){}
function ScienceContest(){}
function MathPuzzleContest(){}

function Percentage(){
    let a = GenerateNumber(1,99)
    let b = GenerateNumber(1,999)
    let expression = `What is ${a}% of ${b}`
    
    let dto = {
        digits : a.concat(b),
        expression : expression
    }

    return dto
}

function Addition(){
    let a = GenerateNumber(1,999)
    let b = GenerateNumber(1,999)
    let expression = `${a} + ${b}`
    
    let dto = {
        digits : a.concat(b),
        expression : expression
    }
    return dto
}
function Subtraction(){
    let a = GenerateNumber(1,999)
    let b = GenerateNumber(1,500)
    let expression = `${a} - ${b}`
    
    let dto = {
        digits : a.concat(b),
        expression : expression
    }
    return dto
}
function Multiplication(){
    let a = GenerateNumber(1,999)
    let b = GenerateNumber(1,999)
    let expression = `${a} X ${b}`
    
    let dto = {
        digits : a.concat(b),
        expression : expression
    }
    return dto
}



function GenerateNumber(maxNum,maxDigit){
    let digits = []
    let count = 0
    while(count<maxNum){
        let a = Math.floor(Math.random*maxDigit)

    }
}