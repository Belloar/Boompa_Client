document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("material-collection").addEventListener("submit",(e)=>{
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    AddSourceMaterial(formData)
})
})


async function AddSourceMaterial(formData){
    
    try{
        let createdBy = new Date().toISOString()
        formData.append("Creator",`bello_ar`)
        formData.append("CreatedOn",`${createdBy}`)

        const response = fetch("https://localhost:44325/api/Admin/AddSourceMaterial",{
            method:"POST",
            "body":formData
            
        })

        const result = (await response).json()
        console.log(result)
    }
    catch(err){
        alert("error"+ err)
        console.log(err)
    }


}

function AddFile(){
    const form = document.getElementById("material-collection")
    let input = document.createElement("input")
    input.type = "file"
    input.name = "file"
    form.appendChild(input)
}