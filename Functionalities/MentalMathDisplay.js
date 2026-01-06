document.addEventListener("DOMcontentLoaded",Main())

function Main(){
//get the content to be displayed from the database
GetSourceMaterial(sessionStorage.getItem("categoryName"),sessionStorage.getItem("sourceId"))
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
    
   RenderContent(result.data)

   }catch(err){

        alert("error"+err)
   }
}
function RenderContent(payload){
    let display = document.getElementById("displayArea")
    let heading = document.getElementById("heading")
    heading.textContent = payload.materialName
    display.textContent = payload.textContent
    
}