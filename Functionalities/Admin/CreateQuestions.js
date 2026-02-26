let formData = new FormData();
let sourceId
let counter = 1;
document.addEventListener('DOMContentLoaded', () => {
    PageNavigation();
});

document.getElementById("add-question-btn").addEventListener("click", () => {
    try {
        alert("event triggered");
        const questionType = document.getElementById("question-type-selector").value;
        const description = document.getElementById("question").value;
        const answer = document.getElementById("answer").value;
        const optionList= Array.from(document.getElementsByClassName("option")).map(option => option.value);
        const options = optionList.join("||");
        // QuestionTypeSelector("");
        console.log(description, answer, options, questionType);
        formData.append(`questions[${counter}].TextDescription`, description);
        formData.append(`questions[${counter}].Answer`, answer);
        formData.append(`questions[${counter}].Option`, options);
        formData.append(`questions[${counter}].QuestionType`,questionType)
        counter++;

        console.log(formData[`questions[1].TextDescription`]);


    } catch (error) {
        console.error("Error adding question:", error);
    }
});

document.getElementById("publish-btn").addEventListener("click", () => {
    AddQuestions(formData)
});


document.getElementById("question-type-selector").addEventListener("change", (ev) => {
    const selectedType = ev.target.value;
    QuestionTypeSelector(selectedType);
});

// document.addEventListener('click', function(e) {
//     if (e.target.id === "create-mcq") {
//         MCQ();
//     }
// });

function MCQ() {
    // <div class="wrapper" id = "Q${counter}">
            
    //     </div>

    const html = `
        
        
        
        <input type="text" id="question" placeholder="Enter question here" /><br>
            
            <input type="text" class="answer" id="answer" placeholder="Answer" /><br>
            <input type="text" class="option" id="option-1" placeholder="Option 1" /><br>
            <input type="text" class="option" id="option-2" placeholder="Option 2" /><br>
            <input type="text" class="option" id="option-3" placeholder="Option 3" /><br>

        <style>
            input{
            border:none;    
            border-bottom: 2px solid #8e8f8f;
            padding: 5px;
            width: 300px;
            }

        </style>
    `;
    document.getElementById("create-questions-form").insertAdjacentHTML('afterbegin', html);
}

function ImageMCQ() {
   
}

function PageNavigation() {
    const html = `
        <nav class="body-item" id="page-nav">
        <a href="" >Create MCQ</a>
        <a href="" >Create Image MCQ</a>
        </nav>


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

function QuestionTypeSelector(type) {
    switch (type) {
        case "mcq":
            MCQ();
            break;
        case "image-mcq":
            ImageMCQ();
            break;
        default:
            MCQ();
            break;
    }
}

function AddQuestions(payload){
    fetch("https://localhost:57561/api/SourceMaterial/AddQuestionsByGuid",{
        method: "POST",
        headers: {
            "sourceId":`${sourceId}`,
            // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: payload



    }).then(response => {
        if(response.ok){
            console.log("Questions published successfully");
        }else{
            console.error("Failed to publish questions");
        }    }).catch(error => {
            console.error("Error publishing questions:", error);
        });
}
