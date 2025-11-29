document.addEventListener("onload",Main())



function Main(){
//get the content to be displayed from the database
GetSourceMaterial(localStorage.getItem("categoryName"),localStorage.getItem("sourceId"))
}

async function GetSourceMaterial(categoryName,sourceId){

   try{
     const response = await fetch("https://localhost:44325/api/SourceMaterial/GetSourceMaterial/",{
        headers:{
            "sourceId":`${sourceId}`,
            "category": `${categoryName}`,
            
        }
    })
    const result = await response.json();
    
   RenderContent(result.data)

   }catch(err){

        alert("error"+err)
   }
}

function RenderContent(payload){
    //gets the node the content will be displayed
    const displayFrame = document.getElementById("content-frame")

    // appends the content title
    let h2 = document.createElement("h2")
    h2.textContent = payload.materialName
    displayFrame.appendChild(h2)
    
    // appends the content
    let p = document.createElement("p")
    p.textContent = payload.content
    displayFrame.appendChild(p)

    // handles the display of the questions
    DisplayQuestions(payload.questions,payload.categoryId)
    
}

function DisplayQuestions(payload,categoryId){

    try{
        const evaluationForm = document.getElementById("evaluationForm")

        payload.forEach((question,i) => {
            //create a fieldset element that will contain the questions and the options 
            const wrapper = document.createElement("fieldset")
            wrapper.classList.add("question")
            let que = document.createElement("legend")

            //the element that will hold the question
            que.id = `Q${i+=1}. `
            que.textContent = que.id + question.question
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
                evaluationForm.appendChild(wrapper)
        });

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
    label.textContent = answer
        

    let ans = document.createElement("input")
    
    ans.id = "answer"
    ans.type = "radio"
    ans.value = answer
    ans.name = number
    label.append(ans)

    
    result.push(label)
    
    
    // split options and create html element to rep them 
    var splitOptions = options.split('|')
    splitOptions.forEach((option) => {
        let label = document.createElement("label")
        label.htmlFor = option
        label.textContent = option

        const input = document.createElement('input')
        input.id = "option"
        input.type="radio"
        input.value = option
        input.name = number
        label.append(input)
        
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
    
    //request payload
    let hermes = {
            "categoryId":categoryId,
            "coinCount":Math.round(result),
            "date":`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
            "duration": duration.toFixed(3),
            "ticketCount":2,
    }
    console.log(hermes)
    sessionStorage.removeItem("startTime")
    alert(`Performance${result}%`)
    DocumentVisit(hermes)

}

async function DocumentVisit(payload){
    const response = await fetch("https://localhost:44325/api/Learner/UpdateLearnerStats/",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${sessionStorage.getItem("token")}`
        },
        body:JSON.stringify(payload)

    })
}



/////////////////////////////////////
/////Point of Improvement///////////
///////////////////////////////////

//// instead of marking the questions after it has been submitted,
// it should be marked as the learner is picking the option

/// i'm trying to figure out a way to display the questions
// and the content simultaneously 