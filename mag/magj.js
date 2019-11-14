var intid;
var delayInterval;
delayInterval = setInterval(checkForRooms, 2000);
var rooms;



//var rs = document.getElementsByClassName("fa fa-fw fa-ban");
//var rs2 = document.getElementsByClassName("fa fa-fw fa-check");
//

function checkForRooms(){
	rooms = document.getElementsByClassName("fa fa-fw fa-check");
	if(rooms.length >= 1){
		//there's a room available
		console.log("Room available");
		
		intid = setInterval(doBeep, 5000);
	}
	else{
		console.log("Room not available");
		intid = setInterval(doUpdate, 15000);
	}
	clearInterval(delayInterval);
}


/*
chrome.runtime.sendMessage(laserExtensionId, {getTargetData: true},
  function(response) {
    if ((response.targetData))
      chrome.runtime.sendMessage(laserExtensionId, {activateLasers: true});
  });
*/


function doUpdate() {
	console.log("Refersh start");
	chrome.runtime.sendMessage(
    "foo",
    function (response) {
        console.log(response);
    }
);
	console.log("Refersh end2");
}


function doBeep() {
	console.log("Beep start");
	chrome.runtime.sendMessage(
    "beep",
    function (response) {
        console.log(response);
    }
);
	console.log("Beep end2");
}






