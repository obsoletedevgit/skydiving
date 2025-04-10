let tracking = false;
let pin = 0;
let savedPos = "";

function init(){
	if(localStorage.getItem("friendlyName")){
		document.getElementById("clientInfoEntry").style.display = "none";
		document.getElementById("startTrackingButton").style.display = "flex";
		updateInfoPopup("INFO: friendly name set & location granted!", 1);
	} else {
		localStorage.clear();
		document.getElementById("startTrackingButton").style.display = "none";
		localStorage.setItem("diveNum", 1);
	}

	document.getElementById("diveNumberText").innerText = "dive number: " + localStorage.getItem("diveNum");
} 

function saveUserInfo(){
	const friendlyName = document.getElementById("nameInput").value;
	localStorage.setItem("friendlyName", friendlyName);

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success, error);
	} else {
		alert('geolocation api is not supported!')
	}
}

function success(position) {
	updateInfoPopup("INFO: friendly name set & location granted!", 1);
	document.getElementById("clientInfoEntry").style.display = "none";	
	document.getElementById("startTrackingButton").style.display = "flex";
}

function error() {
	updateInfoPopup("WARN: Cannot get location", 3);
}

function startTracking(){
	tracking = true;

	document.getElementById("startTrackingButton").style.display = "none";
	document.getElementById("stopTrackingContainer").style.display = "flex";
	rerollStopTrackingPin();

	updateInfoPopup("INFO: Tracking started!", 1);
}

function rerollStopTrackingPin(){
	const stopTrackingText = document.getElementById("stopTrackingText");

	pin = Math.floor(1000 + Math.random() * 9000);
	stopTrackingText.innerText = "Pin to stop tracking: " + pin;
}

function stopTracking(){
	const stopTrackingInput = document.getElementById("stopTrackingInput");

	if (pin == stopTrackingInput.value){
		tracking = false;
		updateInfoPopup("INFO: Tracking stopped!", 1);

		document.getElementById("startTrackingButton").style.display = "flex";
		document.getElementById("stopTrackingContainer").style.display = "none";

		localStorage.setItem("diveNum", Number(localStorage.getItem("diveNum")) + 1);
		document.getElementById("diveNumberText").innerText = "dive number: " + localStorage.getItem("diveNum");
	} else {
		updateInfoPopup("WARN: Incorrect pin!", 3);
	}
}

function uploadInfo(){
	fetch('/uploadInfo', {  
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"friendlyName" : localStorage.getItem("friendlyName"), "diveNum" : localStorage.getItem("diveNum"), "latitude" : savedPos.coords.latitude, "longitude" : savedPos.coords.longitude, "posaccuracy" : savedPos.coords.accuracy, "altitude" : savedPos.coords.altitude, "altAccuracy" : savedPos.coords.altAccuracy, "heading" : savedPos.coords.heading, "speed" : savedPos.coords.speed, "timestamp" : savedPos.timestamp})
    }).then(response => {
        return response.json();
    }) .then(data => {
        data = JSON.parse(data)
        if (data.status != 200){
            return;
        }
	});
}

function getAllTrackingInfo(){
	navigator.geolocation.getCurrentPosition(savepos, error);
	
	document.getElementById("latitudeText").innerText = "Latitude: " + savedPos.coords.latitude;
	document.getElementById("longitudeText").innerText = "Longitude: " + savedPos.coords.latitude;
}

function savepos(position){
	savedPos = position;
}

function heartBeat(){
	if (tracking){
		getAllTrackingInfo();
		uploadInfo();
	}
}

setInterval(function() {
	heartBeat();
}, 2000);
init();