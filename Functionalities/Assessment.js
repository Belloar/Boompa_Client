let counter = 0
let questions
let categoryId
let payload

document.addEventListener("DOMContentLoaded", () => {
    payload=localStorage.getItem("questions")

    questions = JSON.parse(payload)
    categoryId = sessionStorage.getItem("categoryId")
    // DisplayQuestions(questions,sessionStorage.getItem("categoryId"))
    DisplayQuestions(questions[counter])
})

document.getElementById("previous-btn").addEventListener("click",()=>{
    if(counter>1){
        counter--
        document.getElementById("display").textContent = ""
        DisplayQuestions(questions[counter])
        document.getElementById("next-btn").style.display = "block"
    }

    if(counter-1 ==questions.length){
        document.getElementById("previous-btn").style.display = "none"
    }
})

document.getElementById("next-btn").addEventListener("click",()=>{
    if(counter<questions.length){
        counter++
        document.getElementById("display").textContent = ""
        DisplayQuestions(questions[counter])
        document.getElementById("previous-btn").style.display = "block"
    }

    if(counter+1 == questions.length){
        document.getElementById("next-btn").style.display = "none"
    }
})
document.getElementById("submit-btn").addEventListener("click",()=> {
    ComputeRewards(categoryId)
})

function DisplcayQuestions(payload,categoryId){
    // for(let element in question    //     console.log(element)
    // }
    try{
        const display = document.getElementById("display")
        const evaluationForm = document.createElement("form")

        payload.forEach((question,i) => {

            //create a fieldset element that will contain the questions and the options 
            const wrapper = document.createElement("fieldset")
            wrapper.classList.add("question")
            let que = document.createElement("legend")

            
            switch (question.questionType) {
                case "default":
                            //the element that will hold the question
                    que.id = `Q${i+=1}. `
                    que.textContent = que.id + question.textQuestion
                    // console.log("here"+que.id + question.textQuestion)
                    wrapper.appendChild(que)

                    //the options for each question
                    let opt = RefineOptions(question.options,question.answer,`Q${i}`)
                    let labels = ["A.","B.","C.","D."]

                    for(i = 0,a=0; i<opt.length;){
                        //remove a random option from the option array
                        let refinedOption = opt.splice(Math.floor(Math.random()*opt.length),1)
                        //append it to the fieldset
                        wrapper.append(labels[a],refinedOption[0])
                        a++
                        wrapper.appendChild(document.createElement("br"))
                    }
                        
                    break;
                case "type2":
                     //the element that will hold the question
                    que.id = `Q${i+=1}. `
                    que.textContent = que.id
                    let image = document.createElement("img")
                    image.src = question.fileQuestion
                   
                    //the options for each question
                    let opt2 = RefineOptions(question.options,question.answer,`Q${i}`)
                    let labels2 = ["A.","B.","C.","D."]
                    for(i = 0,a=0; i<opt2.length;){
                        //remove a random option from the option array
                        let refinedOption = opt2.splice(Math.floor(Math.random()*opt2.length),1)
                        //append it to the fieldset
                        wrapper.appendChild(que)
                        wrapper.append(image,labels2[a],refinedOption[0])
                        a++
                        wrapper.appendChild(document.createElement("br"))
                    }
                    break;
                default:
                break;
            
            }
                evaluationForm.appendChild(wrapper)
            display.append(evaluationForm)
        


        })
        

        //create the submit button
        const submitBtn = document.createElement("button")
        submitBtn.type = "button"
        submitBtn.textContent = "Submit"
        submitBtn.addEventListener("click",() => {
            //process the learners answers
            ComputeRewards(categoryId)
        })

        evaluationForm.appendChild(submitBtn)
        const startTime =  Date.now()
        sessionStorage.setItem("startTime",startTime)
    }
    catch(err){
        alert(err)
        console.log(err)
    }
 
}

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
    
    //marking the users answers
    let correct = 0
    let wrong = 0
    let totalQuestions = 0
    const form = document.querySelector("#evaluationForm")
    const questions = form.querySelectorAll(".question")
    
    
    questions.forEach(question => {
        totalQuestions++
        let answer = question.querySelector("input[id = 'answer']:checked")
        if(answer){
            correct+=1
        }
        else{
            wrong+=1
        }
    })

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
    sessionStorage.removeItem("startTime")
    alert(`Performance${result}%`)
    DocumentVisit(hermes)

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
   
    try{
        const display = document.getElementById("display")
        const evaluationForm = document.createElement("form")

            //create a fieldset element that will contain the questions and the options 
            const wrapper = document.createElement("fieldset")
            wrapper.classList.add("question")
            let que = document.createElement("legend")

            
            switch (question.questionType) {
                case "default":
                            //the element that will hold the question
                    que.id = `Q${1}. `
                    que.textContent = que.id + question.textQuestion
                    // console.log("here"+que.id + question.textQuestion)
                    wrapper.appendChild(que)

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
                        
                    break;
                case "type2":
                     //the element that will hold the question
                    que.id = `Q${counter+1}. `
                    que.textContent = que.id
                    let image = document.createElement("img")
                    image.src = question.fileQuestion
                   
                    //the options for each question
                    let opt2 = RefineOptions(question.options,question.answer,`Q${counter}`)
                    let labels2 = ["A.","B.","C.","D."]
                    for(i = 0,a=0; i<opt2.length;){
                        //remove a random option from the option array
                        let refinedOption = opt2.splice(Math.floor(Math.random()*opt2.length),1)
                        //append it to the fieldset
                        wrapper.appendChild(que)
                        wrapper.append(image,labels2[a],refinedOption[0])
                        a++
                        wrapper.appendChild(document.createElement("br"))
                    }
                    break;
                default:
                break;
            
            }
                evaluationForm.appendChild(wrapper)
            display.append(evaluationForm)
        




        // //create the submit button
        // const submitBtn = document.createElement("button")
        // submitBtn.type = "button"
        // submitBtn.textContent = "Submit"
        // submitBtn.addEventListener("click",() => {
        //     //process the learners answers
        //     ComputeRewards(categoryId)
        // })

       
        const startTime =  Date.now()
        sessionStorage.setItem("startTime",startTime)
    }
    catch(err){
        alert(err)
        console.log(err)
    }
 
}

