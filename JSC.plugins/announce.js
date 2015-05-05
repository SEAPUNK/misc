//////////////////////
//JSC.plugin.announce
//Simple plugin for announcements at regular intervals.

var announcements = [
    "This is a sample announcement.".yellow(),
    "Configure JSC.plugin.announce to use the messages you want it to."
];

function announce(){
	for (var i=0;i<announcements.length;i++){
		server.broadcastMessage(announcements[i]);
	}
}

setInterval(announce, 1000*60*10);
