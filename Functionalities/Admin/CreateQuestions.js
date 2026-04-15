let formData = new FormData();
let questions = []
let sourceId = "3563b133-a344-43e2-b949-b14772dfc996"
let questionType
let promptMedia
let optionMedia = "default"
let counter = 0;
let isSaved = false
let editorState = 0
let currentQuestionIndex = null
let sourceLink = {}


document.addEventListener('DOMContentLoaded', () => {
    // PageNavigation();
});
// display-dialog box
document.getElementById("add-question-btn").addEventListener("click", () => {
   DisplayDialog();
});

// temporarily save questions 
document.getElementById("save-btn").addEventListener("click", () => {
    if(counter > 0){
        SaveCurrentQuestion()
        console.log(questions)
        DisplayTaperNotification("saved successfully, add another question or publish questions")
    }
    else{
        alert("add a question to save")
    }
})

// display question settings dialog
document.getElementById("settings-btn").addEventListener("click", () => {
    DisplaySettingsDialog()
})

// save questions to database
document.getElementById("publish-btn").addEventListener("click",() => {
 
    console.log(questions)
    AddQuestions()
});

document.getElementById("preview-btn").addEventListener("click",() => {
    CheckQuestionsValidity(question)
    PreviewQuestions(questions)
})

//attach media to question
document.addEventListener("change", async function(ev){
    if(ev.target.id == "prompt-media"){
        promptMedia = ev.target.querySelector("option:checked").value
        
        document.querySelector(".close-dialog").click()
        await SelectFile()
        
        PromptMediaHelper(sourceLink.Source,sourceLink.FileType,"#question")

    }
})

//close dialog-box
document.addEventListener("click", function(ev) {
    if(ev.target.classList.contains("close-dialog")){
        document.querySelector(".dialog-overlay").remove();
    }
   
});

//change option media format
document.addEventListener("change", function(ev){
    if(ev.target.id == "configure-option-format"){
        optionMedia = ev.target.value
        console.log(optionMedia)
        let inputs = document.querySelectorAll(".choice")

        document.querySelector(".close-dialog").click()


        inputs.forEach(input => {
            let btn = document.createElement("button")
            btn.textContent = "Select File"
            btn.type = "button"
            btn.classList.add("media-btn")
            

            btn.onclick = async () => {
                await SelectFile()
                

            let mediaId = input.id
            // console.log(mediaId)
            OptionMediaHelper(sourceLink.Source,sourceLink.FileType,mediaId,mediaId)
            document.querySelector(".media-btn").remove()
            input.remove()

            }

            input.classList.add("is-hidden")
            input.parentNode.appendChild(btn)
        })
    }
})

// add chosen Question template to editor 
document.addEventListener("click", function(ev) {
   
    //append question data to fetch payload if exists
    if(ev.target.id === "add-btn"){
        if(counter>0){
          SaveCurrentQuestion()
        }

        let question = document.querySelector("input[name='question-type']:checked")

        switch(question.value){
            case "mcq":
                MCQ()
                document.querySelector("#settings-btn").classList.remove("is-hidden")
                document.querySelector("#save-btn").classList.remove("is-hidden")
                break;
            case "free-text":
                FreeText()
                document.querySelector("#settings-btn").classList.remove("is-hidden")
                
                break;
            case "mrq":
                
                break;
            default:
                // MCQ()
                break;
        }
        
        
        document.getElementById("widget-description").classList.add("is-hidden")
        counter++ ;

        AddWidget(question.value)
        currentQuestionIndex = counter
        editorState = currentQuestionIndex
        questionType = question.value

        document.querySelector(".dialog-overlay").remove()
    }
});

// display taper notification
document.addEventListener("click", function(ev){
    if(ev.target.id == "taper-btn"){
        document.getElementById("ui-taper-notification").remove()
    }
})

// settings dialog behaviour for different question types
document.addEventListener("click",function(ev){
    if(questionType!=undefined && questionType!=null && questionType == "free-text"){
        document.querySelector("#option-media-selector").classList.add("is-hidden")
    }
})

// toggle question displayed in the editor
document.addEventListener("click",function(ev){
    const widget = ev.target.closest(".question-widget")
    if(!widget){
        return
    }

    const index = Number(widget.dataset.index)
    if(!index || index === currentQuestionIndex){
        return
    }

    SaveCurrentQuestion()
    ToggleDisplayedQuestion(index)
    console.log(questions)
})

//  document.addEventListener("focusout",function(ev){
//     let form = document.createElement("form")
//     form.
// })

function MCQ() {
    const html = `
        <header>
            <h1>Build a structured question</h1>
            <p>Write the prompt, define the answer, and give learners clear choices</p>
        </header>

        <div class="" id="question-template">

            <label class="editor-field full-field" id="" for="question">
                <span>Question Prompt</span><br>
                <input type="text" class="editor-input" id="question" placeholder="Enter Question here" required/><br>
            </label>
            
            <label class="editor-field full-field" id="" for="answer">
                <span>Answer</span><br>
                <input type="text" class="answer choice editor-input" id="answer" placeholder="Input Answer" required/><br>
                <label class="media-btn is-hidden" id="">select file</label>
            </label>

            <label class="editor-field half-field " id="" for="option-1">
                <span>Option 1</span><br>
                <input type="text" class="option choice editor-input" id="option-1" placeholder="Input Text" required/><br>
                <label class="media-btn is-hidden" id="">select file</label>
            </label>

            <label class="editor-field half-field" id="" for="option-2">
                <span>Option 2</span><br>
                <input type="text" class="option choice editor-input" id="option-2" placeholder="Input Text" required/><br> 
                <label class="media-btn is-hidden" id="">select file</label>
            </label>

            <label class="editor-field half-field" id="" for="option-3">
                <span>Option 3</span><br>
                <input type="text" class="option choice editor-input" id="option-3" placeholder="Input Text" required/><br>
                <label class="media-btn is-hidden" id="">select file</label>
            </label>
        
        
        </div>
        
 
    `

    let container = document.getElementById("create-questions-form")
    container.innerHTML = ''
    container.insertAdjacentHTML('beforeend', html);
    
   
}

function MRQ(){
    const html = `
    
    `
}

function FreeText() {
   const html = `
        <label class="editor-field" id="" for="question">
            <span>Question</span><br>
            <input type="text" class="editor-input" id = "question" placeholder="Input Question here"></input>
        </label>

        <label class="editor-field" id="" for="answer">
            <span>Answer</span><br>
            <input type="text" class="editor-input" id="answer" placeholder="Input answer"></input>
        </label>
        
        
   `
   let container = document.getElementById("create-questions-form")
    container.innerHTML = ''
    container.insertAdjacentHTML('afterbegin', html);
    
}

function PageNavigation() {
    const html = `
        <aside class="body-item" id="page-nav">
        <a href="" >Create MCQ</a>
        <a href="" >Create Image MCQ</a>
        </aside>


        <style>
            #page-nav{
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: start;
                background-color: var(--alt-color);
                padding: 10px;
                height: 100vh;
                border: 5px solid #c839d0;
            }
        </style>
    `
    document.body.insertAdjacentHTML('afterbegin', html);
}

function AppendQuestion(typeaQuestion){
    switch(typeaQuestion){
            case "mcq":

                return AppendMCQQuestions()
            case "free-text":

                return AppendFreeQuestions()
            case "mrq":

                return null
            default:
                return null
        }
}

function SaveCurrentQuestion(){
    if(counter === 0 || currentQuestionIndex == null){
        return
    }

    const questionPayload = AppendQuestion(questionType)
    if(!questionPayload){
        return
    }

    questions[currentQuestionIndex - 1] = questionPayload
}

function AddQuestions(){
    console.log(questions)
    fetch("https://localhost:57561/api/SourceMaterial/AddQuestionsByGuid",{
        method: "POST",
        headers: {
            "sourceId":`${sourceId}`,
            "Content-Type":"application/json",
            // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(questions)



    }).then(response => {
        if(response.ok){
            console.log("Questions published successfully");
        }else{
            console.error("Failed to publish questions");
        }    }).catch(error => {
            console.error("Error publishing questions:", error);
        });
}

function AppendMCQQuestions(){
    
    let media = document.querySelector(".question")
    const description = document.getElementById("question").value;
    let template = {}
    if(media!= null || media!=undefined){
        const compDescription = `${media.outerHTML}||${description}`
        template.TextDescription = compDescription
        template.PromptHasMedia = true
    }
    else{
       template.TextDescription = description
       template.PromptHasMedia = false
    }

    if(optionMedia == "default"){
        const answer = document.getElementById("answer").value;
        const optionList= Array.from(document.getElementsByClassName("option")).map(option => option.value);
        const options = optionList.join("||");

        template.Answer = answer
        template.Option = options
        template.QuestionType = questionType
        template.OptionType = "default"
    }
    else{
        const answer = document.getElementById("answer").outerHTML;
        const optionList= Array.from(document.querySelectorAll(".choice:not(#answer)")).map(option => option.outerHTML);
        console.log(optionList)
        const options = optionList.join("||");

        template.Answer = answer
        template.Option = options
        template.QuestionType = questionType
        template.OptionType = optionMedia

        optionMedia = "default"
    }

    return template
}

function AppendFreeQuestions(){
    let media = document.querySelector(".media-tag")
    const description = document.getElementById("question").value;
    let template = {}

    if(media!= null || media!=undefined){
        const compDescription = `${media.outerHTML}||${description}`
        template.TextDescription = compDescription
        template.PromptHasMedia = true
    }
    else{
        template.TextDescription = description
        template.PromptHasMedia = false
    }

    const answer = document.getElementById("answer").value;
    template.Answer = answer
    template.QuestionType = questionType

    return template
}

function DisplaySettingsDialog(){
    const html = `
        <div></div>

         <div class="dialog-overlay" id="">
            <div class="" id="settings-box">
                <button class="close-dialog" id=""><span class="close-dialog fa-solid fa-rectangle-xmark" id="settings-btn"></span></button>
                <h2>Question Settings</h2>
                
                <div class="settings-box-component" id="prompt-media-selector">
                    <span>Attach Media</span><br>
                    <select id="prompt-media">
                        <option class="" id="" value="default" selected>Attach media to question prompt</option>
                        <option class="" id="" value="image"><span class="fa-solid fa-image" id=""></span>Image</option>
                        <option class="" id="" value="video"><span class="fa-solid fa-file-video" id=""></span>Video</option>
                        <option class="" id="" value="audio"><span class="fa-solid fa-file-audio" id=""></span>Audio</option>
                    </select>
                </div>

                <div class="settings-box-component" id="option-media-selector">
                    <span>Option Media Format</span><br>
                    <select id="configure-option-format">
                        <option class="" id="" value="default" selected>Change option media format</option>
                        <option class="" id="" value="image"><span class="fa-solid fa-image" id=""></span>Image</option>
                        <option class="" id="" value="video"><span class="fa-solid fa-file-video" id=""></span>Video</option>
                        <option class="" id="" value="audio"><span class="fa-solid fa-file-audio" id=""></span>Audio</option>
                    </select>
                </div>
                

                
                
             </div>
         </div>
    `
    document.body.insertAdjacentHTML("afterbegin",html)
}

function AddWidget(questionType){
    const widgetContainer = document.querySelector("#widget-container");
    widgetContainer.classList.remove("is-hidden")

    let html = "" // HTML structure for the question widget based on the question type
    switch (questionType) {
        case "mcq":
            html =  `
            <div class="question-widget" data-questionType="${questionType}" data-index="${counter}" id="q${counter}">
                <span class="fa-solid fa-square-poll-horizontal"></span>
                ${counter}. ${questionType}
            </div>
            `
            break;
        case "free-text":
              html =  `
            <div class="question-widget" data-questionType="${questionType}" data-index="${counter}" id="q${counter}">
                <span class="fa-solid fa-square-poll-horizontal"></span>
                ${counter}. ${questionType}
            </div>
            `
            break;

        case "mrq":
            break;
        default:
            MCQ();
            break;
    }
    
    widgetContainer.insertAdjacentHTML('beforeend', html);
}

function DisplayDialog(){
    const html = `
    <section class="dialog-overlay" id="question-dialog-overlay">
        <div id="dialog-box">
            <button class ="close-dialog" id="close-question-dialog">X</button>
            <p class="dialog-item">Pick a Question Template</p>
            
           <div class="function-container">
                <div class="dialog-component" id="question-type-selector">
                    <fieldSet id="selector-field">
                        <legend>Question Type</legend>

                        <label for="mcq">
                        <input type="radio" name = "question-type" class="question-type" value = "mcq" id = "mcq"></input>
                        Multiple Choice question
                        </label><br>

                        <label for="mrq">
                        <input type="radio" name = "question-type" class="question-type" value = "mrq"id = "mrq"></input>
                        Multiple  response question
                        </label><br>

                        <label for="free-text">
                        <input type="radio"class="question-type" name = "question-type" value = "free-text" id="free-text"></input>
                        Free Text Question
                        </label><br>

                    </fieldset>
                </div>

            </div>
           
           
            <button class="" id="add-btn"> Add </button>
        </div>
    </section>

    `
    document.body.insertAdjacentHTML('beforeend', html);
}

function DisplayMediaDialog(){
    const html = `
        <div class="dialog-overlay" id="media-dialog-overlay">
            <div class="" id="media-dialog-box">
                <button class="close-dialog" id="close-media-dialog">X</button>
                <p>Select a Media type</p>

                <div class="media-option">
                    <span class="icon fa-solid fa-image"></span>
                    Image
                </div>

                <div class="media-option">
                    <span class="icon fa-solid fa-file-video"></span>
                    Video
                </div>

                <div class="media-option">
                    <span class="icon fa-solid fa-file-audio"></span>
                    Audio
                </div>

            </div>
        </div>
    `
    document.body.insertAdjacentHTML("afterbegin",html)
}

  function SelectFile(){
    return new Promise((resolve,reject)=>{
        
        let input = document.createElement("input")
        input.type = "file"
        
        input.onchange = async (ev) => {
        let file = ev.target.files[0]
        let fileType = file.type.split("/")[0]

        
        let source = await AddMedia(file)

        sourceLink.Source = source
        sourceLink.FileType = fileType
        resolve(sourceLink)
        
        
    }
       
    input.click()
    })
    
}

function AppendSource(source,fileType,target){
    let html
    
    switch(fileType){
            case "image":
                html = ` <img src="${source}" class="media-tag ${targetClasses}" alt="uploaded image"> `
                break;

            case "video":
                html = ` <video src="${source}" class="media-tag" muted loop>  `
                break;

            case "audio":
                html = ` <audio src="${source}" class="media-tag"> `
                break;
        }
        
        let parentNode = document.querySelector(target)
        parentNode.insertAdjacentHTML("afterend",html)

}

function PromptMediaHelper(source,fileType,target){

    if(promptMedia!= undefined && promptMedia != fileType){
        alert("select valid media type")
        return
    }

    let html
    
    switch(fileType){
            case "image":
                html = ` <img src="${source}" class="media-tag question" alt="uploaded image"> `
                break;

            case "video":
                html = ` <video src="${source}" class="media-tag question" muted loop>  `
                break;

            case "audio":
                html = ` <audio src="${source}" class="media-tag question"> `
                break;
        }
        
        let parentNode = document.querySelector(target)
        parentNode.insertAdjacentHTML("afterend",html)
}

function OptionMediaHelper(source,fileType,target,id){
    if(optionMedia!= fileType){
        alert("select valid media type")
        return
    }
    
    let html
    switch(fileType){
            case "image":
                html = ` <img src="${source}" class="media-tag choice" id="${id}"alt="uploaded image"> `
                break;

            case "video":
                html = ` <video src="${source}" class="media-tag choice" id="${id}" muted loop>  `
                break;

            case "audio":
                html = ` <audio src="${source}" class="media-tag choicec " id="${id}> `
                break;
        }
        
        let parentNode = document.getElementById(`${target}`)
        parentNode.insertAdjacentHTML("afterend",html)
}
async function AddMedia(blobInfo){
    return new Promise((resolve,reject) =>{

        var formData = new FormData()
        formData.append("file",blobInfo)

        fetch("https://localhost:57561/api/Media/UploadMedia",{
          method:"POST",
          headers:{
            // "Authorization":`Bearer ${sessionStorage.getItem("token")}`
          },
          body: formData
        }).then(response => {

          if(!response.ok){
            console.log("A server error occured")
          }
          return response.json()

        }).then(payload => {

          resolve(payload.location)
          
        }).catch(error => {

          console.log("Error"+error.message)
          reject(error.message)

        })

      })
}

function DisplayUINotification(message){
    const html = `
        <section class="dialog-overlay " id="">
            <div class="ui-notification" id="ui-center-notification">
                <button class="close-dialog" id="">close</button>
                <p class="" id="">${message}</p> 
            </div>
        </section>
    `
    document.body.insertAdjacentHTML("afterbegin",html)
}
function DisplayTaperNotification(message){
    const html = `
        <section class="ui-notification " id="ui-taper-notification">
            <div class="taper-component" >
                <button class="" id="taper-btn">close</button>
                <p class="" id="">${message}</p>
            </div>
        </section>
    `
    document.body.insertAdjacentHTML("afterbegin",html)
}

function ToggleDisplayedQuestion(count){
    let question = questions[count-1]
    if(!question){
        return
    }

    currentQuestionIndex = count
    editorState = currentQuestionIndex
    questionType = question.QuestionType
    console.log("toggle Question")
    switch(question.QuestionType){
        
            case "mcq":
                MCQ()
                document.querySelector("#settings-btn").classList.remove("is-hidden")
                document.querySelector("#save-btn").classList.remove("is-hidden")

                let promptField = document.querySelector("#question")
               if(question.PromptHasMedia ){

                let prompt = question.TextDescription
                let questionArr = prompt.split("||")
                
                promptField.value = questionArr[1]

                promptField.insertAdjacentHTML("afterend",questionArr[0])
               }
               else{
                promptField.value = question.TextDescription
               }

               let answerField = document.getElementById("answer")
               let optionArr = question.Option.split("||")
               let optionFieldList = document.querySelectorAll(".option")
               switch(question.OptionType){
                     case "default":
                        answerField.value = question.Answer
                        optionArr.forEach((option,i) => {
                        optionFieldList[i].value = option
                        })
                        break;
                     case "image":
                        answerField.insertAdjacentHTML("afterend", question.Answer)
                        answerField.classList.add("is-hidden")
                        optionArr.forEach((option,i) =>{
                             
                            optionFieldList[i].insertAdjacentHTML("afterend" ,option)
                            optionFieldList[i].classList.add("is-hidden")
                        })
                        break;
                    case "video":
                    case "audio":
                        answerField.insertAdjacentHTML("afterend", question.Answer)
                        answerField.classList.add("is-hidden")
                        optionArr.forEach((option,i) =>{
                            optionFieldList[i].insertAdjacentHTML("afterend" ,option)
                            optionFieldList[i].classList.add("is-hidden")
                        })
                        break;
                }

                break;
            case "free-text":
                FreeText()
                document.querySelector("#settings-btn").classList.remove("is-hidden")
                document.querySelector("#save-btn").classList.remove("is-hidden")

                let promptInput = document.querySelector("#question")
                if(question.PromptHasMedia){
                    let prompt = question.TextDescription
                    let questionArr = prompt.split("||")
                    promptInput.value = questionArr[1]
                    promptInput.insertAdjacentHTML("afterend",questionArr[0])
                }
                else{
                    promptInput.value = question.TextDescription
                }

                document.querySelector("#answer").value = question.Answer
                
                break;
            case "mrq":
                
                break;
            default:
                // MCQ()
                break;
        }

    

}

function PreviewQuestions(fetchObject){
    const html = `
        <section class="dialog-overlay" id="">
            <h2>Preview Questions</h2>
            <div id="preview-box">
            </div>
        </section>
    `
}




