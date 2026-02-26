document.addEventListener("DOMContentLoaded",() => {
    GetSourceMaterial(localStorage.getItem("categoryName"),localStorage.getItem("sourceId"))
    document.getElementById("quiz-btn").addEventListener("click",() => {
        window.location.assign("/Pages/Assessment.html")
    })
})

async function GetSourceMaterial(category,sourceId){

   try{
     const response = await fetch(`https://localhost:57561/api/SourceMaterial/GetSourceMaterial/${sourceId}/${category}`,{
       
    })
    const result = await response.json();

    sessionStorage.setItem("categoryId",result.data.categoryId)
    let content = `
    <div>
       ${result.data.textContent} 
    </div>
        `
    
    document.body.insertAdjacentHTML("beforeend",content)
    localStorage.setItem("questions",JSON.stringify(result.data.questions))

   }catch(err){
        console.log(err)
        alert("error"+err)
   }
}
