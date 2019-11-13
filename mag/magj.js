var intid;
var delayInterval;
delayInterval = setInterval(checkForRooms, 2000);
var rooms;




function checkForRooms(){
	rooms = document.getElementsByClassName("panel");
	if(rooms.length >= 3){
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






