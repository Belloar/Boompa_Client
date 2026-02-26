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

        const html = `
        <div class="flex-item" data-id="${sourceMaterial.sourceId}">
            <h2>${sourceMaterial.sourceName}</h2>
            <p>${sourceMaterial.sourceDescription}</p>
        </div> `

        document.getElementById("container").insertAdjacentHTML("beforeend",html)

        //when clicked store the category name and the source material id 
        let div = document.querySelector(`[data-id="${sourceMaterial.sourceId}"]`)
        div.addEventListener("click",() => Redirect(`${sessionStorage.getItem("category")}`,div.dataset.id))
    });
}




function Redirect(categoryName,sourceId){
    localStorage.setItem("categoryName",categoryName)
    localStorage.setItem("sourceId",sourceId)
    
    // window.location.assign("/pages/Article_Consumption.html")
    window.location.assign("/pages/TinyArticleConsumption.html")
}
