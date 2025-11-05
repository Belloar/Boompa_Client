document.addEventListener("DOMContentLoaded",() => {

    const material = document.getElementById("material-collection")
    material.addEventListener("submit",(e)=>{
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    AddSourceMaterial(formData)

    const container = document.getElementById("container")
    const evalForm = AddQuestion()

   
    container.replaceChild(evalForm,form)  

    evalForm.addEventListener("submit", () => {
        // ev.preventDefault
        let form = e.target
        let formData = new FormData(form)
    })
})

    
})


function Main(){
    document.getElementById("material-collection").addEventListener("submit",(e)=>{
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    AddSourceMaterial(formData)
})
}

async function AddSourceMaterial(formData){
    try{
        
        let createdBy = new Date().toISOString()
        formData.append("Creator",`bello_ar`)
        formData.append("CreatedOn",`${createdBy}`)

        sessionStorage.setItem("sourceName",`${formData[SourceMaterialName]}`)
        const response = fetch("https://localhost:44325/api/Admin/TestEndpoint",{
            method:"POST",
            "headers":{
                "Authorization":""
            },
            "body":formData
            
        })

        const result = (await response).json()
        console.log(result)
    }
    catch(err){
        alert("error"+ err)
        console.log(err)
    }
}

function AddFile(){
    const form = document.getElementById("material-collection")
    let input = document.createElement("input")
    input.type = "file"
    input.name = "file"
    form.appendChild(input)
}


async function DeleteContent(){}

async function ReviewContent(){}

async function AddChallenges(){}

function AddQuestion(){
    let heading = document.createElement("h2")
    heading.textContent = "Source Evaluation Questions"

    let instruction = document.createElement("p")
    instruction.textContent = "Add questions for the source material if any."

    const form = document.createElement("form")
    
    const button = document.createElement("button")
    button.textContent = "Add Question"
    
    button.addEventListener("click",(ev) =>{
         ev.preventDefault()
         const questionTemplate = QuestionTemplate()
            form.appendChild(questionTemplate)
       
    })
    
    form.append(heading,instruction,button)
    
    return form

}

function QuestionTemplate(){
    let label = document.createElement("label")
    label.htmlFor = "question"
    label.classList.add("eval")

    let theQuestion = document.createElement("input")
    theQuestion.name="Description"
    theQuestion.type = "text"
    theQuestion.placeholder = "Input your question"

    let answer = document.createElement("input")
    answer.name = "Answer"
    answer.type = "text"
    answer.placeholder = "Answer"

    let option1 = document.createElement("input")
    option1.name = "option"
    option1.type = "text"
    option1.placeholder = "option"

    let option2 = document.createElement("input")
    option2.name = "option"
    option2.type = "text"
    option2.placeholder = "option"

    let option3 = document.createElement("input")
    option3.name = "option"
    option3.type = "text"
    option3.placeholder = "option"

    label.append(theQuestion,answer,option1,option2,option3)
   
    return label

}

async function AddQuestionAsync(formData){
    const response = fetch("",{
        method:"POST",
        headers:{
            "Authorization":""

        },
        body:formData
    })

    const result = (await response).json()

}