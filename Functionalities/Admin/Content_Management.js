// document.addEventListener("DOMContentLoaded",() => {

//     const material = document.getElementById("material-collection")
//     material.addEventListener("click",(e)=>{
//     e.preventDefault()
//     const form = e.target
//     const sourceFormData = new FormData(form)
//     AddSourceMaterial(formData)

//     const container = document.getElementById("container")
//     const evalForm = AddQuestion()

   
//     container.replaceChild(evalForm,form)

//     })
// })

function Main(){

    // get the html form and convert it to form data 
   const form =  document.querySelector("#material-collection")
    const formData = new FormData(form)

    //send the source material to the database
    AddSourceMaterial(formData)

    //replace the source material form with the question submission form to collect the questions to evaluate the learner
    const container = document.getElementById("container")
    const evalForm = AddQuestion()
    container.replaceChild(evalForm,form)
}

async function AddSourceMaterial(formData){
    try{
        // add who created the material and the time it was created
        let createdBy = new Date().toISOString()
        //lines 43 and 44  will be replaced with the jwt later in time
        formData.append("Creator",`bello_ar`)
        formData.append("CreatedOn",`${createdBy}`)

        // add the sourceMaterail name and its category so as to save the material's questions after
        sessionStorage.setItem("sourceName",`${formData.get("sourceMaterialName")}`)
        sessionStorage.setItem("category",`${formData.get("category")}`)

        // send the data to the backend
        const response = fetch("https://localhost:44325/api/Admin/AddSourceMaterial",{
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

let questionCount = 0;
function AddQuestion(){
    //creates the information to be displayed to the admin
    let heading = document.createElement("h2")
    heading.textContent = "Source Evaluation Questions"

    let instruction = document.createElement("p")
    instruction.textContent = "Add questions for the source material if any."

    //create the form to be used to collect the evaluation data
    const form = document.createElement("form")
    form.id = "evalForm"
    
    //creates a button that adds the fields to be used to collect the question data when clicked
    const anotherOne = document.createElement("button")
    anotherOne.textContent = "Add Question"
    anotherOne.type = "button"
    anotherOne.addEventListener("click",() =>{
         
         const questionTemplate = QuestionTemplate(questionCount++)
            form.appendChild(questionTemplate)
       
    })

    //the submit button that sends the evaluation data for processing before being sent to the backend
    const submitBtn = document.createElement("button")
    submitBtn.type = "button"
    submitBtn.textContent = "Submit"
   
    submitBtn.addEventListener("click",()=>{ 
       
        ProcessData(document.getElementById("evalForm"))
    })
    form.append(heading,instruction,anotherOne,submitBtn)
    
    return form

}

function QuestionTemplate(index){
    const wrapper = document.createElement("div")
    wrapper.classList.add("wrapper")
    wrapper.dataset.index = index

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

    let files = document.createElement("input")
    files.type = "file"
    files.multiple = true
    files.name = "queFiles"
    


    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => wrapper.remove());

    label.append(theQuestion,answer,option1,option2,option3,files,removeBtn)
   
    wrapper.appendChild(label)
    return wrapper

}

async function AddQuestionAsync(questionData,sourceMaterialName,category){
    
    try{
        const response = fetch("https://localhost:44325/api/Admin/AddQuestions",{
        method:"POST",
        headers:{
           
            "sourceMaterialName":`${sourceMaterialName}`,
            "category":`${category}`,
            "Authorization":""

        },
        body:questionData
    })

    const result = (await response).json()

    }
    catch(err){
        console.log(err)
    }

}

function AppendQuestions(sourceFormData,evalFormData){
    // this function is meant to work for when i try to send both sourcematerial and questions together in one request

}
function ProcessData(form){
const wrappers = Array.from(form.querySelectorAll(".wrapper"));
  const formData = new FormData();

  wrappers.forEach((w, i) => {
    const description = w.querySelector('[name="Description"]').value.trim();
    const answer = w.querySelector('[name="Answer"]').value.trim();
    const opt =  Array.from(w.querySelectorAll('[name="option"]')).map(i => i.value.trim())
    const options = opt.join("|")
    
    
    formData.append(`questions[${i}].description`, description);
    formData.append(`questions[${i}].answer`, answer);
    formData.append(`questions[${i}].option`, options);

   
    const files = w.querySelector('[name="queFiles"]')?.files;
    if (files && files.length > 0) {
      for (let j = 0; j < files.length; j++) {
        formData.append(`questions[${i}].queFiles`, files[j]);
      }
    }
  });

  console.log([formData])
  AddQuestionAsync(formData,sessionStorage.getItem("sourceName"),sessionStorage.getItem("category"))
  
}

function PointsOfImprovement(){
    // make the content box have a limit of words so as to make the implementation of evauation mid-content consumption easier

    //make the source material and the questions data go to the database at once 

    // introduce question type to the content creation form. the question type will help define the different ways question
    //data can be collected and rendered to the user (this will be done in the backend)
}
