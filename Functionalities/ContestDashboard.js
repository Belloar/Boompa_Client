document.getElementById("type1").addEventListener("click",()=>{
    sessionStorage.setItem("contestType","type1")
    Redirect()
})

document.getElementById("type2").addEventListener("click",()=>{
    sessionStorage.setItem("contestType","type2")
    Redirect()
} )

document.getElementById("type3").addEventListener("click",()=>{
    sessionStorage.setItem("contestType","type3")
    Redirect()
} )

document.getElementById("type4").addEventListener("click",()=>{
    sessionStorage.setItem("contestType","type4")
    Redirect()
})

document.getElementById("type5").addEventListener("click",()=>{
    sessionStorage.setItem("contestType","type5")
    Redirect()
})


function Redirect(){
    window.location.assign("ContestWorkpage.html")
}