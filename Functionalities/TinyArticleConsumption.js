document.addEventListener("DOMContentLoaded",() => {
    GetSourceMaterial(localStorage.getItem("categoryName"),localStorage.getItem("sourceId"))
})

async function GetSourceMaterial(categoryName,sourceId){

   try{
     const response = await fetch("https://localhost:57561/api/SourceMaterial/GetSourceMaterial/",{
        headers:{
            "sourceId":`${sourceId}`,
            "category": `${categoryName}`,
            
        }
    })
    const result = await response.json();

    sessionStorage.setItem("categoryId",result.data.categoryId)
    let content = `
    <div>
       ${result.data.textContent} 
    </div>
        `
    
    document.body.insertAdjacentHTML("beforeend",content)

   }catch(err){
        console.log(err)
        alert("error"+err)
   }
}