var sourceId = null
let counter = 1

document.getElementById("submitBtn").addEventListener("click",() =>{ Main()})

document.getElementById("text1").addEventListener("input",(ev)=>{
    document.getElementById("counter").textContent = ev.target.value.length
})

document.getElementById("add-btn").addEventListener("click",() => {
    ContentTemplate()
})

async function Main(){

    // get the html form and convert it to form data 
    const form =  document.querySelector("#material-collection")
    const formData = ProcessSourceMaterialData(form)

    //send the source material to the database
    sourceId = await AddSourceMaterial(formData)
    

    //replace the source material form with the question submission form to collect the questions to evaluate the learner
    const container = document.getElementById("container")
    const evalForm = AddQuestion()
    container.replaceChild(evalForm,form)
    alert(sourceId)
}

async function AddSourceMaterial(formData){
    try{
        // add who created the material and the time it was created
        let createdBy = new Date().toISOString()
        
        formData.append("CreatedOn",`${createdBy}`)

        // add the sourceMaterail name and its category so as to save the material's questions after
        sessionStorage.setItem("sourceName",`${formData.get("sourceMaterialName")}`)
        sessionStorage.setItem("category",`${formData.get("category")}`)

        // send the data to the backend
        const response = await fetch("https://localhost:57561/api/SourceMaterial/AddSourceMaterial",{
            method:"POST",
            "headers":{
                "Authorization":`Bearer ${sessionStorage.getItem("token")}`
            },
            "body":formData
            
        })

        const result = await response.json()
        return result.data
        
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
    wrapper.dataset.questionType = "default"

    // defines the label element for the question to be inputed
    let label = document.createElement("label")
    label.htmlFor = "question"
    label.classList.add("eval","wrapper-item")

    //defines the input field for the question 
    let theQuestion = document.createElement("input")
    theQuestion.id = "question"
    theQuestion.name="Description"
    theQuestion.type = "text"
    theQuestion.placeholder = "Input your question"
    theQuestion.classList.add("wrapper-item")

    // defines the answer input field 
    let answer = document.createElement("input")
    answer.name = "Answer"
    answer.id = "answer"
    answer.type = "text"
    answer.placeholder = "Answer"
    answer.classList.add("wrapper-item")
    let count = 0
    
    //Defines the options dropdown list
    const list = document.createElement("select")
    list.id = "Options"
    list.addEventListener("change", (ev) => ChangeQuestionType(ev.target.value,ev.target))
    list.dataset.index = index

    let option = document.createElement("option")
    option.value = "option"
    option.textContent = "option"

    let remove = document.createElement("option");
    remove.textContent = "Remove";
    remove.value = "remove"
    

    let qType2 = document.createElement("option")
    qType2.textContent = "to_Type2"
    qType2.value = "to_Type2"
    
    list.append(option,remove,qType2)
    
    label.append(theQuestion,answer)
    
    // defines the option field 
    while(count<3){
        let option1 = document.createElement("input")
        option1.name = "option"
        option1.type = "text"
        option1.placeholder = "option"
        option1.classList.add("wrapper-item","option")
        label.appendChild(option1)
        count++
    }
    label.append(list)
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
            "Authorization":`bearer ${sessionStorage.getItem("token")}`

        },
        body:questionData
    })

    const result = (await response).json()
    console.log(result)
    }
    catch(err){
        console.log(err)
    }

}

async function AddQuestionAsync(questionData,sourceId){
    
    try{
        const response = fetch("https://localhost:57561/api/SourceMaterial/AddQuestionsByGuid",{
        method:"POST",
        headers:{
           
            "sourceId":`${sourceId}`,
            "Authorization":`Bearer ${sessionStorage.getItem("token")}`

        },
        body:questionData
    })

    const result = (await response).json()
    console.log(result)
    // window.location.reload()
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
    // console.log(w)
   switch(w.dataset.questionType){
        case "type2":
            const description2Input = w.querySelector('[name="Description"]');
            const description2 = description2Input.files[0];
            const answer2 = w.querySelector('[name="Answer"]').value.trim();
            const opt2 =  Array.from(w.querySelectorAll('[name="option"]')).map(i => i.value.trim())
            const options2 = opt2.join("|")
            
            
            formData.append(`questions[${i}].FileDescription`, description2);
            formData.append(`questions[${i}].Answer`, answer2);
            formData.append(`questions[${i}].Option`, options2);
            formData.append(`questions[${i}].QuestionType`,w.dataset.questionType)
            console.log(description2)
            break;


        case "default":
            const description = w.querySelector('[name="Description"]').value.trim();
            const answer = w.querySelector('[name="Answer"]').value.trim();
            const opt =  Array.from(w.querySelectorAll('[name="option"]')).map(i => i.value.trim())
            const options = opt.join("|")
            
            
            formData.append(`questions[${i}].TextDescription`, description);
            formData.append(`questions[${i}].Answer`, answer);
            formData.append(`questions[${i}].Option`, options);
            formData.append(`questions[${i}].QuestionType`,w.dataset.questionType)
            // console.log(options)
            break;

   }
  });

//   for (let pair of formData.entries()) {
//     console.log(pair[0], pair[1]);
// }
  
  AddQuestionAsync(formData,sourceId)
  
}
function ChangeQuestionType(targetValue,target){
const wrapper = target.parentNode
    switch (targetValue) {
        case "to_Type2":
            let newInput = document.createElement("input")
            newInput.type = "file"
           wrapper.parentNode.dataset.questionType = "type2"
            newInput.id = "question"
            newInput.name = "Description"
            
            
            wrapper.querySelector("#question").replaceWith(newInput)
            wrapper.dataset.questionType = "type2"
            
            break;
        case "remove":
            target.parentNode.parentNode.remove()
            break;
        default:
            let defaultInput = document.createElement("input")
            defaultInput.type = "text"
            defaultInput.id = "question"
            defaultInput.name = "Description"
            defaultInput.placeholder = "input your question"
            console.log(defaultInput)
            
            wrapper.querySelector("#question").replaceWith(defaultInput)
            // wrapper.parentNode.dataset.questionType = "default"
            break;
    }
}

function ContentTemplate(){
    counter++
    let fieldset = document.getElementById("content-field")
    let label = document.createElement("label")
    let textArea = document.createElement("textarea")
    let p = document.createElement("p")
    let counterSpan = document.createElement("span")
    let constantSpan = document.createElement("span")
    let fileInput = document.createElement("input")
    let removeBtn = document.createElement("button")
    let br = document.createElement("br")
    label.dataset.index = counter
    label.htmlFor = `text${counter}`

    fileInput.type = "file"
    fileInput.multiple = true

    textArea.maxLength = 500
    textArea.rows = 8
    textArea.cols = 80
    textArea.placeholder = "continue your article here"
    textArea.addEventListener("input", (ev)=> {
        counterSpan.textContent = ev.target.value.length
    })

    constantSpan.textContent = "/500"

    counterSpan.textContent = "0"

    removeBtn.textContent = "Remove"
    removeBtn.addEventListener("click", ()=>{
        label.remove()
    })

    p.append(counterSpan,constantSpan)
    label.append(fileInput,br,textArea,p,removeBtn)

    fieldset.appendChild(label)
}

function ProcessSourceMaterialData(form){
    const formData = new FormData()

    return formData
}

function PointsOfImprovement(){
    // make the content box have a limit of words so as to make the implementation of evauation mid-content consumption easier

    //make the source material and the questions data go to the database at once 

    // introduce question type to the content creation form. the question type will help define the different ways question
    //data can be collected and rendered to the user (this will be done in the backend)
}
