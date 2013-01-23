// ==UserScript==
// @name Never Dupes
// @include *
// ==/UserScript==

function recvMsg(event) {
	//console.log("RECEIVED: ", event);
	if ( event.data == 'doReload') 
	{
		console.log("Trying reload");
		var formsCollection = document.getElementsByTagName("form");
		for(var i=0;i<formsCollection.length;i++)
		{
			if (IsDirty(formsCollection[i])) 
			{
				console.log(window.location.href, "seems dirty, no reload");
				return;
			}
		}

		window.location.reload();
		console.log("reloaded ", window.location);
	}
}


function IsDirty(form) {
    for (var i=0; i<form.elements.length; i++) {
        var field = form.elements[i];
			  //console.log("field Type:", field.type);
        switch (field.type) {
            case "select-multiple":
            case "select-one":
                var options = field.options;
                for (var j=0; j<options.length; j++) {
                    if(options[j].selected != options[j].defaultSelected) return true;
                }
                break;
            case "text":
            case "file":
					  case "textarea":
            case "password":
                if (field.value != field.defaultValue) return true;
                break;
            case "checkbox":
            case "radio":
                if (field.checked != field.defaultChecked) return false;
                break;
        }
    }
    return false;
}


function sndMsg(e) 
{
	opera.extension.postMessage("update");
	//console.log("Sent update msg, event was", e);
}

opera.extension.onmessage = recvMsg;

window.addEventListener("DOMContentLoaded", sndMsg, false);
window.addEventListener("message", recvMsg, false);
