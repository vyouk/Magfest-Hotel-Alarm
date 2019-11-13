var beeperEnabled = 1;
var beeperhalfvolume = 0;
var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);


function beep(duration, frequency, volume, type, callback) {
	console.log("beep");
	if(beeperEnabled){
		if(beeperhalfvolume){
			volume /= 2;
		}
		var oscillator = audioCtx.createOscillator();
		var gainNode = audioCtx.createGain();

		oscillator.connect(gainNode);
		gainNode.connect(audioCtx.destination);

		if (volume){gainNode.gain.value = volume;};
		if (frequency){oscillator.frequency.value = frequency;}
		if (type){oscillator.type = type;}
		if (callback){oscillator.onended = callback;}

		oscillator.start();
		setTimeout(function(){oscillator.stop()}, (duration ? duration : 500));
	}
};



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("background.js got a message")
        console.log(request);
        console.log(sender);
		console.log("id: " + sender.tab.id);
		if(request == "foo"){
			chrome.tabs.reload(sender.tab.id);
		}
		if(request == "beep"){
			beep(750,900,0.2);
		}
        sendResponse("bar");
    }
);