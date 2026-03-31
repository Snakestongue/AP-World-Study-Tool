function mobile(){
    let mobile = window.matchMedia("(max-width: 1100px)").matches;
    let footerDisable = document.getElementById("github")
    if (mobile){
        footerDisable.style.display = "none"
    }else{
        footerDisable.style.display = "flex"
    }
}
mobile()
