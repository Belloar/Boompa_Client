document.addEventListener("DOMContentLoaded",() => {

    const material = document.getElementById("material-collection")
    material.addEventListener("submit",(e)=>{
    e.preventDefault()
    const form = e.target
    const sourceFormData = new FormData(form)
    //AddSourceMaterial(formData)

    const container = document.getElementById("container")
    const evalForm = AddQuestion()

   
    container.replaceChild(evalForm,form)  

    // evalForm.addEventListener("submit", (ev) => {
    //     ev.preventDefault
    //     let form = e.target
    //     const evalFormData = new FormData(form)
    //     ProcessData(evalFormData)


    //     // const processedData = ProcessData(evalFormData)
    //     // AddQuestionAsync(processedData)
        
    // })
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
    form.id = "evalForm"
    
    const anotherOne = document.createElement("button")
    anotherOne.textContent = "Add Question"
    anotherOne.type = "button"
    anotherOne.addEventListener("click",(ev) =>{
         ev.preventDefault()
         const questionTemplate = QuestionTemplate()
            form.appendChild(questionTemplate)
       
    })
    const submitBtn = document.createElement("button")
    submitBtn.type = "button"
    submitBtn.textContent = "Submit"
    // submitBtn.addEventListener("click",()=>{ AddQuestionAsync(document.getElementById("evalForm"))})
    submitBtn.addEventListener("click",(ev)=>{ ProcessData(document.getElementById("evalForm"))})
    form.append(heading,instruction,anotherOne,submitBtn)
    
    return form

}

function QuestionTemplate(){
    const wrapper = document.createElement("div")
    wrapper.classList.add("wrapper")

    let label = document.createElement("label")
    label.htmlFor = "question"
    label.classList.add("eval","wrapper-item")


    let theQuestion = document.createElement("input")
    theQuestion.id = "question"
    theQuestion.name="Description"
    theQuestion.type = "text"
    theQuestion.placeholder = "Input your question"
    theQuestion.classList.add("wrapper-item")

    let answer = document.createElement("input")
    answer.name = "Answer"
    answer.id = "answer"
    answer.type = "text"
    answer.placeholder = "Answer"
    answer.classList.add("wrapper-item")

    let option1 = document.createElement("input")
    option1.name = "option"
    option1.type = "text"
    option1.placeholder = "option"
    option1.classList.add("wrapper-item","option")

    let option2 = document.createElement("input")
    option2.name = "option"
    option2.type = "text"
    option2.placeholder = "option"
    option2.classList.add("wrapper-item","option")

    let option3 = document.createElement("input")
    option3.name = "option"
    option3.type = "text"
    option3.placeholder = "option"
    option3.classList.add("wrapper-item","option")

    label.append(theQuestion,answer,option1,option2,option3)
   
    wrapper.appendChild(label)
    return wrapper

}

async function AddQuestionAsync(questionData,sourceMaterialName){
    
    const response = fetch("https://localhost:44325/api/Admin/TestEndpoint",{
        method:"POST",
        headers:{
            "sourceMaterialName":`${sourceMaterialName}`,
            "Authorization":""

        },
        body:formData
    })

    const result = (await response).json()

}

function AppendQuestions(sourceFormData,evalFormData){
    // this function is meant to work for when i try to send both sourcematerial and questions together in one request

}
function ProcessData(form){
    let formData = new FormData(form)
   const obj = {};
formData.forEach((value, key) => {
  if (obj[key]) {
    // Handle fields with same name (e.g., multiple checkboxes)
    obj[key] = [].concat(obj[key], value);
  } else {
    obj[key] = value;
  }
});

console.log(obj);
}