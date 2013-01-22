// ==UserScript==
// @name Never Dupes
// @include *
// ==/UserScript==



function recvMsg(event) {
	//console.log("RECEIVED: ", event);
	if ( event.data == 'doReload') 
	{
		window.location.reload();
		console.log("reloaded ", window.location);
	}
}



function sndMsg() 
{
	opera.extension.postMessage("update");
	console.log("Sent update msg");
}

opera.extension.onmessage = recvMsg;

window.addEventListener("DOMContentLoaded", sndMsg, false);
window.addEventListener("message", recvMsg, false);
