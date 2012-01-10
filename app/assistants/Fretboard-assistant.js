function FretboardAssistant(data) {
    this.db = data.db;
    this.chord = data.chord;
}

FretboardAssistant.prototype.setup = function() {
    $$('body')[0].addClassName("fretboard");
    
    this.controller.setupWidget(Mojo.Menu.appMenu, this.attributes = {
		omitDefaultItems: true
		}, this.model = { items: [
			Mojo.Menu.editItem,
	        {label: "About "+Mojo.appInfo.title, command: 'appmenu-about'},
	        {label: "Help", command: 'appmenu-help'}
	        ]
		}
	);
	
	// Prepare the sound
	if(!this.chord.nosound) {
		try {
			this.sound = new Audio();
			this.sound.mojo.audioClass = "media";
			this.sound.src = Mojo.appPath + 'sounds/'+this.chord.root+" "+this.chord.type+".mp3";
			this.sound.autoplay = false;
		} catch(err) {}
	}
	
	this.feedMenuModel = {
	  visible: true,
	  items: [{
	    items: [
	      { label: this.chord.root+" "+this.chord.type, width: 260 },
	      { icon: "chord-play", command: 'playChord', label: ""}
	    ]
	  }]
	};

	this.controller.setupWidget(Mojo.Menu.viewMenu, { spacerHeight: 0, menuClass:'no-fade' }, this.feedMenuModel);
    
    // This is going to be mind-blowing. Brace yourself. Seriously.
    this.notes = this.chord.note_formula.split("-");
    
    string = 6;
    for(var i=0; i<6; i++) {
        this.controller.get("form-s"+string).update(this.notes[i]);
        if(this.notes[i] != "X" && this.notes[i] != "0") {
            this.controller.get("s"+string).addClassName("f"+this.notes[i]).addClassName("fingerdot");
            this.controller.get("s"+string).update(this.chord.finger_formula[i]);
        }
        string--;
    }
    
    // Trick for generating barring--barring is currently ugly
    /*if(this.chord.bar) {
        barvar = this.chord.bar.split("-");
        for(var i=barvar[1]; i >= barvar[2]; i--) {
            this.controller.get("b"+i).addClassName("f"+barvar[0]).addClassName("fingerdot").update(barvar[3]);
        }
    }*/
    
    // Auto-detect common barring techniques
    if(this.notes[0]==this.notes[5] 
		&& this.notes[0] !== "X" 
		&& this.notes[0] !== "0"
		&& this.notes[0] <= this.notes[1] && this.notes[0] <= this.notes[2]
		&& this.notes[0] <= this.notes[3] && this.notes[0] <= this.notes[4]) { // Full six-string bar
        this.controller.get("bar").addClassName("bar_full").addClassName("f"+this.notes[0]).update(this.chord.finger_formula[0]);
    }
	
    if(this.notes[1]==this.notes[5] 
		&& this.notes[1] !== "X" 
		&& this.notes[1] !== "0"
		&& this.notes[1] <= this.notes[2] && this.notes[1] <= this.notes[3]
		&& this.notes[1] <= this.notes[4]) { // Partial five-string bar
        this.controller.get("bar").addClassName("bar_5").addClassName("f"+this.notes[1]).update(this.chord.finger_formula[1]);
    }
    
}

FretboardAssistant.prototype.playChord = function() {
	if(this.sound) {
		this.sound.play();
	}
}

FretboardAssistant.prototype.activate = function(event) {
    $$('body')[0].addClassName("palm-dark");
    $$('body')[0].addClassName("fretboard");
}


FretboardAssistant.prototype.deactivate = function(event) {
    $$('body')[0].removeClassName("palm-dark");
    $$('body')[0].removeClassName("fretboard");
    this.sound = null;
}

FretboardAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
}
