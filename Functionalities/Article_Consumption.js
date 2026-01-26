let questions 
let counter = 0
let content 
let sourceFiles

document.addEventListener("onload",Main())

document.getElementById("quiz-btn").addEventListener("click",() => {
    // sessionStorage.setItem("questions", JSON.stringify(questions))
    window.location.assign("/pages/Assessment.html")
})

document.getElementById("previous-btn").addEventListener("click",() => {
    
    if(counter>0){
        // reduce the counter value to that of the previous page
        counter--
        // get the target node for the operation
        let target = document.querySelector(".text-content")

        // reset its content to nothing
        target.innerHTML = ""
        
        // filter for the files that correspond to the page
        let pagefiles = []
        sourceFiles.forEach(file => {
            if(file.index==counter){
                pagefiles.push(file.fileURL)
            }
        })
        // append images to the page
        pagefiles.forEach(pagefile => {
            let img = document.createElement("img")
            img.src = pagefile
            img.classList.add("content-item")
            img.style.width= "500px"
            img.style.height = "500px"
            target.appendChild(img)
        })

        // append text content to the page
        let p = document.createElement("p")
        p.classList.add("content-item")
        p.textContent = content[counter]
        target.appendChild(p)
    
    
    }
})

document.getElementById("next-btn").addEventListener("click",() => {
    
    if(counter<content.length){
        // increment the value of the counter
        counter++

        // get the target node of the operation
        let target = document.querySelector(".text-content")
        target.innerHTML = ""
        
        // filter for the files that correspond to the page
        let pagefiles = []
        sourceFiles.forEach(file => {
                if(file.index==counter){
                    pagefiles.push(file.fileURL)
                }
            })
        
        // append the images to the page
        pagefiles.forEach(pagefile => {
            let img = document.createElement("img")
            img.src = pagefile
            target.appendChild(img)
        })

        // append text content to the page
        let p = document.createElement("p")
        p.textContent = content[counter]

        target.appendChild(p)
    }
})

function Main(){
//get the content to be displayed from the database
GetSourceMaterial(localStorage.getItem("categoryName"),localStorage.getItem("sourceId"))
}

async function GetSourceMaterial(categoryName,sourceId){

   try{
     const response = await fetch("https://localhost:57561/api/SourceMaterial/GetSourceMaterial/",{
        headers:{
            "sourceId":`${sourceId}`,
            "category": `${categoryName}`,
            
        }
    })
    const result = await response.json();

    sessionStorage.setItem("categoryId",result.data.categoryId)
    // sessionStorage.setItem("questions",result.data.questions)

    RenderContent(result.data)

   }catch(err){
        console.log(err)
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
    
    content = payload.textContent.split("||")

    if(content.length<=1){
        document.getElementById("previous-btn").style.display = "none"
        document.getElementById("next-btn").style.display = "none"
    }
    // appends the content
    let wrapper = document.createElement("p")
    wrapper.classList.add("text-content")
    
    
    let p = document.createElement("p")
    p.textContent = content[0]

    sourceFiles = payload.sourceFiles
    let pagefiles = []
    sourceFiles.forEach(file => {
        if(file.index==counter){
            pagefiles.push(file.fileURL)
        }
    })

    pagefiles.forEach(pagefile => {
        let img = document.createElement("img")
        img.src = pagefile
        img.style.width= "500px"
        img.style.height = "500px"
        wrapper.appendChild(img)
    })
    wrapper.appendChild(p)
    displayFrame.appendChild(wrapper)


    // // handles the display of the questions
    // questions = payload.questions
    localStorage.setItem("questions", JSON.stringify(payload.questions))
    // DisplayQuestions(payload.questions,payload.categoryId)
    
}

function DisplayQuestions(payload,categoryId){

    try{
        const evaluationForm = document.getElementById("evaluationForm")

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

/////////////////////////////////////
/////Point of Improvement///////////
///////////////////////////////////

//// instead of marking the questions after it has been submitted,
// it should be marked as the learner is picking the option

/// i'm trying to figure out a way to display the questions
// and the content simultaneously 