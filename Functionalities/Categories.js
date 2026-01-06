
function Redirect(categoryName){
    switch(categoryName){
        case "Mental Math":
            window.location.assign("MentalMath.html")
            break;

        default:
            window.location.assign("Materials_Display.html")
            break;
    }
    
}

function PickCategory(categoryName){
    sessionStorage.setItem("category",categoryName)
    Redirect(categoryName);
}
