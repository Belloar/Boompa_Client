
function Redirect(){
    window.location.replace("Materials_Display.html")
}

function PickCategory(categoryName){
    sessionStorage.setItem("category",categoryName)
    Redirect();
}
