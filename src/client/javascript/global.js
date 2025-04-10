const infoPopup = document.getElementById("infoPopup");
const infoPopupText = document.getElementById("infoPopupText");

function updateInfoPopup(text, sev){
    if (sev == 1){
        infoPopup.style.backgroundColor = "#9FFFCB";
    } else if (sev == 2) {
        infoPopup.style.backgroundColor = "#FFA500";
    } else {
        infoPopup.style.backgroundColor = "#FF0000";
    }

    infoPopupText.innerText = text;
}