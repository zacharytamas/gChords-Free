function ChordLibraryAssistant() {
}

ChordLibraryAssistant.prototype.setup = function() {
    this.appMenuModel = {
      items: [
        Mojo.Menu.editItem,
        {label: "About "+Mojo.appInfo.title, command: 'appmenu-about'},
        {label: "Help", command: 'appmenu-help'}
      ]
    };
    this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems: true}, this.appMenuModel);
    
    this.builtin_chords = [
        {root: "A", type: "Major", note_formula: "X-0-2-2-2-0", finger_formula: "XX234X", pos: 0},
        {root: "A", type: "Minor", note_formula: "X-0-2-2-1-0", finger_formula: "XX231X", pos: 0},
        {root: "A", type: "7",     note_formula: "X-0-2-0-2-0", finger_formula: "XX2X3X", pos: 0},

        
        {root: "B", type: "Major", note_formula: "X-2-4-4-4-2", finger_formula: "X12341", pos: 0},
        {root: "B", type: "Minor", note_formula: "X-2-4-4-3-2", finger_formula: "X13421", pos: 0},
        {root: "B", type: "7",     note_formula: "X-2-1-2-0-2", finger_formula: "X213X4", pos: 0},

        {root: "C", type: "Major", note_formula: "X-3-2-0-1-0", finger_formula: "X32X1X", pos: 0},
        {root: "C", type: "Minor", note_formula: "X-3-1-0-1-X", finger_formula: "X42X1X", pos: 0},
        {root: "C", type: "7",     note_formula: "X-3-2-3-1-0", finger_formula: "X3241X", pos: 0},

        {root: "D", type: "Major", note_formula: "X-X-0-2-3-2", finger_formula: "XXX132", pos: 0},
        {root: "D", type: "Minor", note_formula: "X-X-0-2-3-1", finger_formula: "XXX231", pos: 0},
        {root: "D", type: "7",     note_formula: "X-X-0-2-1-2", finger_formula: "XXX213", pos: 0},

        {root: "E", type: "Major", note_formula: "0-2-2-1-0-0", finger_formula: "X231XX", pos: 0},
        {root: "E", type: "Minor", note_formula: "0-2-2-0-0-0", finger_formula: "X23XXX", pos: 0},
        {root: "E", type: "7",     note_formula: "0-2-0-1-0-0", finger_formula: "X2X1XX", pos: 0},

        {root: "F", type: "Major", note_formula: "1-3-3-2-1-1", finger_formula: "134211", pos: 0},
        {root: "F", type: "Minor", note_formula: "1-3-3-1-1-1", finger_formula: "134111", pos: 0},
        {root: "F", type: "7",     note_formula: "1-3-1-2-1-1", finger_formula: "131211", pos: 0},

        {root: "G", type: "Major", note_formula: "3-2-0-0-0-3", finger_formula: "21XXX3", pos: 0},
        {root: "G", type: "Minor", note_formula: "3-1-0-0-3-3", finger_formula: "21XX34", pos: 0},
        {root: "G", type: "7",     note_formula: "3-2-0-0-0-1", finger_formula: "32XXX1", pos: 0},
        
    ];
    
    this.chordsListModel = { items: this.builtin_chords }
    
    this.controller.setupWidget("chords_list", {
        itemTemplate: 'lists/chord-item',
        dividerTemplate: 'lists/chord-divider',
        dividerFunction: function(item) {return item.root}
        }, this.chordsListModel
    );
    
    this.controller.listen("chords_list", Mojo.Event.listTap, this.showChord.bind(this));
    
}

ChordLibraryAssistant.prototype.showChord = function(event) {
    Mojo.Controller.stageController.pushScene("Fretboard", {db: this.db, chord:event.item} );
}

ChordLibraryAssistant.prototype.activate = function(event) {
}


ChordLibraryAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

ChordLibraryAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
}
