document.addEventListener("DOMContentLoaded",()=>{
    GetMaterials("Mental Math")
})
document.getElementById("speedAction").addEventListener("click", () => {
    window.location.assign("Workpage.html")
})

document.getElementById("practice").addEventListener("click",() => {
    window.location.assign("PracticePage.html")
})
async function GetMaterials(categoryName){
    try{
        const response = await fetch("https://localhost:57561/api/SourceMaterial/GetSourceMaterialNames",{
        headers:{
            "categoryName":categoryName,
            "Authorization":sessionStorage.getItem("token")
        }
        
    })
    let result = await response.json()
    // console.log(result.data) 
    DisplayArticles(result.data)
    }
    catch(err){
        alert("Error:" + err)
    }
}

function DisplayArticles(payload){
    payload.forEach(sourceMaterial => {
        //let id = sourceMaterial

        // will be responsible for the clicking event
        let div = document.createElement("div");
        div.dataset.id= sourceMaterial.sourceId
        div.classList.add("mainContent")

        //Display the source material name
        let heading = document.createElement("h2");
        heading.textContent=sourceMaterial.sourceName

        //Display the description of the article
        let p = document.createElement("p")
        p.textContent=sourceMaterial.sourceDescription

        div.appendChild(heading)
        div.appendChild(p)
        document.getElementById("mainSection").appendChild(div)

        //when clicked store the category name and the source material id 
        console.log(`${div.id}`)
        div.addEventListener("click",() => {
            sessionStorage.setItem("categoryName","Mental Math")
            sessionStorage.setItem("sourceId",div.dataset.id)
            location.assign("MentalMathDisplay.html")
        })
    });
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



