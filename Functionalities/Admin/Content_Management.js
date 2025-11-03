async function AddContent(){
    let form = document.getElementById("content-form")
    let formData = new FormData(form)


    const response = fetch("",{
        method:"POST",
        headers:{
            "content-type":"multi-part"
        },
        body:`${formData}`
    })
}

async function DeleteContent(){}

async function ReviewContent(){}

async function AddChallenges(){}