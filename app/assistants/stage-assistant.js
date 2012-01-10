function StageAssistant() {
    
}

StageAssistant.prototype.setup = function() {
    this.controller.pushScene("ChordLibrary");
}

StageAssistant.prototype.handleCommand = function(event) {
    stagecontroller = this.controller;
    this.controller=Mojo.Controller.stageController.activeScene();
    
    if (event.type == Mojo.Event.commandEnable &&
	    (event.command == Mojo.Menu.helpCmd)) {
         event.stopPropagation(); // enable help. now we have to handle it
    }
    
    if(event.type == Mojo.Event.command) {
        switch(event.command) {
            case 'appmenu-about':
                this.controller.showAlertDialog({
                onChoose: function(value) {
                    switch(value) {
                        case "website":
                            this.controller.serviceRequest("palm://com.palm.applicationManager", {
                              method: "open",
                              parameters:{id:'com.palm.app.browser',params: {target: "http://www.zacharytamas.com/"}}});
                        break; }
                },
                title: $L(Mojo.appInfo.title+" v"+Mojo.appInfo.version),
                message: $L("A simple guitar chord encyclopedia for your webOS-powered device. — Copyright 2009, Zachary Jones"),
                choices:[
                  {label:$L("OK"), value:"okay", type:'affirmative'},
                  {label:$L("Visit Developer's Website"), value:"website"}
                ]
             });
            break;
            case 'appmenu-help':
				Mojo.Controller.stageController.pushScene('Support');
				break;
			case 'playChord':
			    this.controller.assistant.playChord();
			    break;
    	}
    }
}