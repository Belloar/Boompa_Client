document.addEventListener(onload,Main())




function Main(){
    GetMaterials(sessionStorage.getItem("category"))
}

async function GetMaterials(categoryName){
    try{
        const response = await fetch(`https://localhost:57561/api/SourceMaterial/GetSourceMaterialNames/`,{
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
        console.log(err)
        
        
    }
    
}


function DisplayArticles(payload){
    payload.forEach(sourceMaterial => {
        //let id = sourceMaterial

        // will be responsible for the clicking event
        let div = document.createElement("div");
        div.dataset.id= sourceMaterial.sourceId
        div.classList.add("flex-item")

        //Display the source material name
        let heading = document.createElement("h2");
        heading.textContent=sourceMaterial.sourceName

        //Display the description of the article
        let p = document.createElement("p")
        p.textContent=sourceMaterial.sourceDescription

        div.appendChild(heading)
        div.appendChild(p)
        document.getElementById("container").appendChild(div)

        //when clicked store the category name and the source material id 
        console.log(`${div.id}`)
        div.addEventListener("click",() => Redirect(`${sessionStorage.getItem("category")}`,div.dataset.id))
    });
}




function Redirect(categoryName,sourceId){
    localStorage.setItem("categoryName",categoryName)
    localStorage.setItem("sourceId",sourceId)
    
    window.location.assign("/pages/Article_Consumption.html")
}
