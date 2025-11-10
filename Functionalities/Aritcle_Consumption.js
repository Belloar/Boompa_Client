document.addEventListener("onload",Main())



function Main(){
//get the source material from the database
const material = GetSourceMaterial(localStorage.getItem("categoryName"),localStorage.getItem("sourceName"))

//display the material to the learner
RenderContent(material.questions)

}

async function GetSourceMaterial(categoryName,sourceName){
 
   try{
     const response = await fetch("https://localhost:44325/api/SourceMaterial/GetSourceMaterial/",{
        headers:{
            "sourceMaterialName":`${sourceName}`,
            "category": `${categoryName}`,
            
        }
    })
    const result = await response.json();
    console.log(result.data)
    //RenderContent(result)

   }catch(err){

        alert("error"+err)
   }
}

function RenderContent(payload){

    let sourceFiles = payload.data.files
    sourceFiles.foreach(sourceFile => {
        switch (sourceFile.FileType) {
            case "image":
                const reader = new Fil
                
                break;
            case "video":
                break;
            case "url":
                break;

        
            default:
                break;
        }
    })

    if(sourceFiles != null){
        const video = document.createElement("iframe")
        video.src = material.video
        video.classList.add("video")
        // i'll come back to handle the different media types
        document.getElementById("content-frame").appendChild(video)
    }else if(payload.data.text){

    }
    
    payload.data.Questions.forEach(question => {
        const evaluationForm = document.getElementById("evaluationForm")

        let description = document.createElement("label")
        description.textContent=question.description
        
        let opt = RefineOptions(question.Options)
        opt.forEach(option =>{
            description.appendChild(option)
        })

            evaluationForm.appendChild(description)
    });
    
    /// i'm trying to figure out a way to display the questions
    // and the content simultaneously 
}


function RefineOptions(options){
     options = question.option.split(',')
        options.forEach(option => {
            const splitOption = option.split("|")
            // const label = document.createElement("label")
            // label.htmlFor = `${splitOption[0]}`
            // label.textContent = `${splitOption[0]}:`

           const input = document.createElement('input')
           input.id =`${splitOption[0]}`
           input.type="radio"
           input.value = `${splitOption[1]}`

        } )
        return options
}

function ComputeRewards(form){
   const formData = new FormData(form)
   formData.get()
}