//////////////////
//JSC.plugin.help
//Replaces /help with custom messages.
var logger = new (require("logger"))({
	prefix: "help"
});

var separator = "=====================================================".darkpurple();

var msgs = [
	separator,
	"Your help messages go here.".aqua(),
	separator
];

var commands = [];

//These are sample commands, formatted how I would format them.
commands[0] = [
	separator,
	"Commands - 1/2".gold(),
	"/help ".darkgreen()+"".green()+" "+"Displays server help.",
	"/commands ".darkgreen()+"[index]".green()+" "+"Displays this list.",
	"/me ".darkgreen()+"<message>".green()+" "+"Does a regular /me message.",
	"/whois ".darkgreen()+"<custom_name>".green()+" "+"Displays real username.",
	"Usage".yellow()+": If custom name is "+"Cool".blue()+" Guy".green()+", do "+"/whois cool guy".gold(),
	"/st ".darkgreen()+"<player>".green()+" "+"(Admin) ".red()+"Strikes a player with lightning.",
	"Do ".gold()+"/commands 2".green()+" for more commands.".gold(),
	separator
];

commands[1] = [
	separator,
	"Commands - 2/2".gold(),
	"/setname ".darkgreen()+"<player> <custom_name>".green()+" "+"(Admin) ".red()+"Sets custom name.",
	"/(un)mute ".darkgreen()+"<player>".green()+" "+"(Admin) ".red()+"(un)Fun mutes a player.",
	"/tell ".darkgreen()+"<player> <message>".green()+" "+"Sends a private message to a player.",
	"/kill ".darkgreen()+" "+"Kills yourself.",
	"/(un)harmless ".darkgreen()+"<player> ".green()+"(Admin) ".red()+"Makes a player harmless.",
	"",
	"",
	separator
];

function display_help(e){
	logger.log(e.getPlayer().getName()+" did "+e.getMessage());
	e.setCancelled(true);
	var player = e.getPlayer();
	for (var i=0;i<msgs.length;i++){
		player.sendMessage(msgs[i]);
	}
}

function display_commands(e){
	logger.log(e.getPlayer().getName()+" did "+e.getMessage());
	e.setCancelled(true);
	
	var index = 0;
	var msg = String(e.getMessage());
	msg = msg.split(" ");
	if (msg.length > 1 && msg[1]){
		if (commands[msg[1]-1]){
			index = msg[1]-1;
		}
	}
	
	var player = e.getPlayer();
	for (var i=0;i<commands[index].length;i++){
		player.sendMessage(commands[index][i]);
	}
}
events.on("player.PlayerCommandPreprocessEvent", function(l,e){
	var msg = String(e.getMessage()).toLowerCase()+" ";
	if (msg.indexOf("/help ") == 0 || msg.indexOf("/? ") == 0){
		display_help(e);
	}
	else if (msg.indexOf("/commands ") == 0){
		display_commands(e);
	}
});
