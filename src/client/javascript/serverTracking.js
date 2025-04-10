var live = false
var diverName = "*";
var diveNum = "*";

function toggleLiveUpdates(){
    if (live == false){
        live = true;
    } else {
        live = false;
    }
}

function downloadInfo(){
    if (!document.getElementById("diverNameInput").value){
        diverName = "*";
    } else {
        diverName = document.getElementById("diverNameInput").value;
    }

    if (!document.getElementById("diveNumInput").value){
        diveNum = "*";
    } else {
        diveNum = document.getElementById("diveNumInput").value;
    }

    fetch('/downloadinfo', {  
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"friendlyName" : diverName, "diveNum" : diveNum})
    }).then(response => {
        return response.json();
    }) .then(data => {
        data = JSON.parse(data);

        formatData(data);

        if (data.status != 200){
            return;
        }
	});
}

function formatData(data){
    const diveTable = document.getElementById("diveTable");

    diveTable.innerHTML = `            <tr>
                <th>Dive ID</th>
                <th>Diver name</th>
                <th>Dive number</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Position accuracy</th>
                <th>Altitude</th>
                <th>Altitude accuracy</th>
                <th>Heading</th>
                <th>Speed</th>
                <th>Timestamp</th>
            </tr>`

    //Formatting

    for (var dive of data){
        console.log(dive)

        var tableRow = document.createElement("tr");
        diveTable.append(tableRow);

        var diveIdTD = document.createElement("td");
        diveIdTD.innerText = dive.D_ID;
        tableRow.appendChild(diveIdTD);

        var diverNameTD = document.createElement("td");
        diverNameTD.innerText = dive.D_DIVER;
        tableRow.appendChild(diverNameTD);

        var diveNumTD = document.createElement("td");
        diveNumTD.innerText = dive.D_DIVENUM;
        tableRow.appendChild(diveNumTD);

        var diveLatitudeTD = document.createElement("td");
        diveLatitudeTD.innerText = dive.D_LATITUDE;
        tableRow.appendChild(diveLatitudeTD);

        var diveLongitudeTD = document.createElement("td");
        diveLongitudeTD.innerText = dive.D_LONGITUDE;
        tableRow.appendChild(diveLongitudeTD);

        var divePosAccuracyTD = document.createElement("td");
        divePosAccuracyTD.innerText = dive.D_POSACCURACY;
        tableRow.appendChild(divePosAccuracyTD);

        var DiveAltitudeTD = document.createElement("td");
        DiveAltitudeTD.innerText = dive.D_ALTITUDE;
        tableRow.appendChild(DiveAltitudeTD); 

        var DiveAltAccuracyTD = document.createElement("td");
        DiveAltAccuracyTD.innerText = dive.D_ALTACCURACY;
        tableRow.appendChild(DiveAltAccuracyTD); 

        var DiveHeadingTD = document.createElement("td");
        DiveHeadingTD.innerText = dive.D_HEADING;
        tableRow.appendChild(DiveHeadingTD); 

        var DiveSpeedTD = document.createElement("td");
        DiveSpeedTD.innerText = dive.D_SPEED;
        tableRow.appendChild(DiveSpeedTD); 

        var DiveTimestampTD = document.createElement("td");
        DiveTimestampTD.innerText = dive.D_TIMESTAMP;
        tableRow.appendChild(DiveTimestampTD); 
    }
}

function heartBeat(){
	if (live){
        downloadInfo();
	}
}

setInterval(function() {
	heartBeat();
}, 2000);