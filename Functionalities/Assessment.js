let counter = 0
let questions
let categoryId
let payload
let correct = 0
let wrong = 0
let totalQuestions = 0
let answeredQuestions = {}
let questionElements = {}

document.addEventListener("DOMContentLoaded", () => {
    payload=localStorage.getItem("questions")

    questions = JSON.parse(payload)
    totalQuestions = questions.length
    categoryId = sessionStorage.getItem("categoryId")
    
    // DisplayQuestions(questions,sessionStorage.getItem("categoryId"))
    DisplayQuestions(questions[counter])
})

document.getElementById("previous-btn").addEventListener("click",()=>{
    if(counter>=1){
        counter--
        let display = document.getElementById("display")
        display.textContent = ""
        display.append(questionElements[`Q${counter+1}`])
        
        document.getElementById("next-btn").style.display = "block"

        if(answeredQuestions[`Q${counter+1}`]){
            let question = document.querySelector(".question")
            let value = answeredQuestions[`Q${counter+1}`]
            question.querySelector(`input[value="${value}"]`).checked = true
        }
    }
    
    if(counter == 0){
        document.getElementById("previous-btn").style.display = "none"
    }
})

document.getElementById("next-btn").addEventListener("click",()=>{
        if(counter<questions.length){
        counter++
        let display = document.getElementById("display")
        display.textContent = ""
        if(questionElements[`Q${counter+1}`]){
            display.append(questionElements[`Q${counter+1}`])
        }
        else{
            DisplayQuestions(questions[counter])
        }
        
        document.getElementById("previous-btn").style.display = "block"
    }

    if(answeredQuestions[`Q${counter+1}`]){
        let question = document.querySelector(".question")
        let value = answeredQuestions[`Q${counter+1}`]
        question.querySelector(`input[value="${value}"]`).checked = true
    }
    if(counter+1 == questions.length){
        document.getElementById("next-btn").style.display = "none"
    }
})
document.getElementById("submit-btn").addEventListener("click",()=> {
    ComputeRewards(categoryId) 
    console.log("categoryId: " + categoryId)
    console.log("correct :"+correct +"wrong :"+wrong)
})

function RefineOptions(options,answer,number){
    const result= []

    // creating the answer input 
    let label = document.createElement("label")
    label.htmlFor = answer

    let ans = document.createElement("input")
    
    ans.id = "answer"
    ans.type = "radio"
    ans.value = answer
    ans.innerHTML = answer
    ans.name = number
    label.append(ans,document.createTextNode(answer))

    result.push(label)

    // split options and create html element to rep them 
    var splitOptions = options.split('|')
    splitOptions.forEach((option) => {
        let label = document.createElement("label")
        label.htmlFor = option

        const input = document.createElement('input')
        input.id = "option"
        input.type="radio"
        input.value = option
        input.name = number
        label.append(input,document.createTextNode(option))
        
        result.push(label)
    })
    return result
}

function ComputeRewards(categoryId){
    //processing the duration of the lesson
    let startTime = sessionStorage.getItem("startTime")
    let endTime =  Date.now()
    let duration = (endTime-startTime)/(1000*60)
    let result = (correct/totalQuestions)*100
    let date = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate() > 9 ? new Date().getDate() : "0"+new Date().getDate()}`
    
    //request payload
    let hermes ={
                "categoryId":categoryId,
                "coinCount":Math.round(result),
                "date":date,
                "duration": Math.round(duration),
                "ticketCount":2,
    }
    console.log(hermes)
    // sessionStorage.removeItem("startTime")
    alert(`Performance${result}%`)
    // DocumentVisit(hermes)

}

 async function DocumentVisit(payload){
    console.log(sessionStorage.getItem("token"))
    const response = await fetch("https://localhost:57561/api/Learner/UpdateLearnerStats/",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${sessionStorage.getItem("token")}`
        },
        body:JSON.stringify(payload)

    })
    let result = await response.json()
    console.log(result)
    alert(result.data)
}

function DisplayQuestions(question){
    const display = document.getElementById("display")
    const evaluationForm = document.createElement("form")

    //create a fieldset element that will contain the questions and the options 
    const wrapper = document.createElement("fieldset")
    wrapper.classList.add("question")
    let que = document.createElement("legend")
    
    switch (question.questionType) {
        case "default":
            //the element that will hold the question
            que.id = `Q${counter+1}. `
            que.textContent = que.id + question.textQuestion
            wrapper.appendChild(que)

            break;
        case "type2":
                //the element that will hold the question
            que.id = `Q${counter+1}. `
            que.textContent = que.id
            let image = document.createElement("img")
            image.src = question.fileQuestion
            wrapper.appendChild(image)
            
            break;
        default:
        break;
    }

    //the options for each question
    let opt = RefineOptions(question.options,question.answer,`Q${counter+1}`)
    let labels = ["A.","B.","C.","D."]

    for(i = 0,a=0; i<opt.length;){
        //remove a random option from the option array
        let refinedOption = opt.splice(Math.floor(Math.random()*opt.length),1)
        //append it to the fieldset
        wrapper.append(labels[a],refinedOption[0])
        a++
        wrapper.appendChild(document.createElement("br"))
    }

    wrapper.addEventListener("change",(ev)=>{
        if(!answeredQuestions[`Q${counter+1}`] ){
            let answer = wrapper.querySelector("input[id = 'answer']:checked")
            if(answer){
                correct+=1
            }
            else{
                wrong+=1
            }
            answeredQuestions[`Q${counter+1}`] = ev.target.value
        }
        else{
            let previousAnswer = answeredQuestions[`Q${counter+1}`]
            let answer = wrapper.querySelector("input[id = 'answer']").value

            if(previousAnswer == answer && ev.target.value != answer){
                    correct-- ; wrong++ 
                    answeredQuestions[`Q${counter+1}`] = ev.target.value
                }
            if(previousAnswer != answer && ev.target.value == answer){
                correct++ ; wrong--
                answeredQuestions[`Q${counter+1}`] = ev.target.value
            }
        }

    })

    evaluationForm.appendChild(wrapper)
    display.append(evaluationForm)
    
    questionElements[`Q${counter+1}`] = wrapper

}
