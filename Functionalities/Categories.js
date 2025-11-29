
function Redirect(){
    window.location.assign("Materials_Display.html")
}

function PickCategory(categoryName){
    sessionStorage.setItem("category",categoryName)
    Redirect();
}
