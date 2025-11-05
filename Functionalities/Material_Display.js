document.addEventListener(onload,Main())




function Main(){
    
    GetMaterials(sessionStorage.getItem("category"))

    
}




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
        console.log(err)
        
        
    }
    //sessionStorage.removeItem("category")
}


function DisplayArticles(payload){
    payload.result.forEach(sourceMaterial => {
        let a = document.createElement("a");
        a.id= sourceMaterial.sourceName
        let heading = document.createElement("h2");
        let p = document.createElement("p")
        
        heading.textContent=sourceMaterial.sourceName
        p.textContent=sourceMaterial.sourceDescription
        a.classList.add("flex-item")

        a.appendChild(heading)
        a.appendChild(p)
        document.getElementById("container").appendChild(a)
        a.addEventListener("click",() => Redirect(`${sessionStorage.getItem("category")}`,sourceMaterial.sourceName))
    });
}




function Redirect(categoryName,sourceName){
    localStorage.setItem("categoryName",categoryName)
    localStorage.setItem("sourceName",sourceName)
    window.location.replace("/pages/Article_Consumption.html")
}
