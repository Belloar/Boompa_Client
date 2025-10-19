document.addEventListener(onload,GetMaterials(sessionStorage.getItem("category")))
document.getElementsByClassName("flex-item").addEventListener("click",GetSourceMaterial)

async function GetMaterials(categoryName){
    try{
        const response = await fetch(`https://localhost:44325/api/SourceMaterial/GetSourceMaterialNames/`,{
            headers:{
                "categoryName":`${categoryName}`
            }
        })
        const payload = await response.json();
        const result= payload.data
        
        DisplayArticles(result)
    }
    catch(err){
        alert("error:"+err)
        
        
    }
}


function DisplayArticles(payload){
    payload.result.forEach(sourceMaterial => {
        let a = document.createElement("a");
        let heading = document.createElement("h2");
        let p = document.createElement("p")
        
        heading.textContent=sourceMaterial.sourceName
        p.textContent=sourceMaterial.sourceDescription
        div.classList.add("flex-item")

        div.appendChild(heading)
        div.appendChild(p)
        document.getElementById("container").appendChild(div)
        
    });
}

async function GetSourceMaterial(categoryName,sourceName){
 
   try{
     const response = await fetch("https://localhost:44325/api/SourceMaterial/GetSourceMaterial/",{
        headers:{
            "categoryName": `${categoryName}`,
            "sourceName":`${sourceName}`
        }
    })

    const result = response.json();

    

   }catch(err){

        alert("error"+err)
   }



}
