///////////////////////
//JSC.plugin.customname
//Simple plugin for setting custom names.

//Set up plugin's storage
////////////////////////////////////////////////////////////////////////////////
var plgn_name = "CustomName",
	plgn;
if (plugin.exists(plgn_name)){
	plgn = plugin.get(plgn_name).data;
}
else{
	plgn = plugin.add(plgn_name).data;
}
////////////////////////////////////////////////////////////////////////////////

//Import modules
var stringcolor = require("util/string/color"),
	announcer 	= require("announcer");

//Define variables.
var c = org.bukkit.ChatColor;

//Set up announcer.
announcer = new announcer({
	tell_prefix: "cn> ".gray(),
	broadcast_prefix: "["+"cn".blue()+"]> "
});

//Set plugin storage variables if already not set.
if (!plgn.set){
	plgn.set = true;
	plgn.players = {};
	plgn.usernames = {};
}

//Set display and player list name.
function set_name(player, customName){
	//Get list name.
	var listName = determine_list_name(customName);
	//Set display and list names.
	player.setDisplayName(customName+c.RESET);
	player.setPlayerListName(listName);
}

//Determine list name.
function determine_list_name(customName){
	//Check if current custom name is too long.
	if (customName.length > 16){
		//Try stripping the colors, and try again.
		customName = stringcolor.stripf(customName);
		if (customName.length > 16){
			//Give up and return the trimmed colorless custom name.
			return (String(customName).substr(0,15)+"~");
		}
	}
	return customName;
}

//Handle the /setname command.
function handle_setname(args, self){
	//Check if person has permission.
	if (!self.isOp()){
		announcer.tell("You don't have permission to change your/others name!", self);
		return;
	}

	//Shift args array by one.
	args.shift();

	//Check if the length of args is less than 2.
	if (args.length < 2){
		announcer.tell("Usage: /setname <player> <custom_name>", self);
		return;
	}

	//Define variables.
	var target,
		targetName,
		customName,
		customLower,
		customColor,
		listName;

	//Determine target.
	target = server.getPlayer(args.shift());
	//Check if target exists.
	if (!target){
		announcer.tell("No player found with that username!", self);
		return;
	}
	
	//Target's username.
	targetName = String(target.getName());
	//Custom name, raw input
	customRaw = String(args.join(" "));
	//Custom name, formatted without color.
	customName = String(stringcolor.stripu(customRaw));
	//Custom name, formatted with color.
	customColor = String(stringcolor.format(customRaw));
	//Custom name, formatted without color, lowercase.
	customLower = customName.toLowerCase();

	if (customColor.length > 16){
		if (customName.length > 16){
			announcer.tell("Warning: Your list name is colorless and trimmed to fit the character limit.", target);
			announcer.tell("Warning: The list name is colorless and trimmed to fit the character limit.", self);
		}
		else{
			announcer.tell("Warning: Your list name is colorless to fit the character limit.", target);
			announcer.tell("Warning: The list name is colorless to fit the character limit.", self);
		}
	}

	//Check if target name is same as custom name color-formatted.
	if (targetName == customColor){
		//If the player doesn't already have a custom name, then just cancel.
		if (!plgn.players[targetName]){
			announcer.tell("Why would you set "+targetName+"'s custom username as "+targetName+"'s username?", self);
			return;
		}
		//Otherwise, delete the player's data and reset their display and list names.
		delete plgn.usernames[stringcolor.stripf(plgn.players[targetName]).toLowerCase()];
		delete plgn.players[targetName];
		set_name(target, targetName);
		announcer.broadcast(targetName+" has cleared their custom username.");
		announcer.tell(targetName+"'s custom username has been cleared.", self);
		return;
	}

	//Check if the username is already registered.
	if (plgn.usernames[customLower] && plgn.usernames[customLower] != undefined){
		announcer.tell("That custom name already belongs to "+plgn.usernames[customLower], self);
		return;
	}
	
	//Check if they already have a custom name, and if so, delete it.
	if (plgn.players[targetName]){
		delete plgn.usernames[stringcolor.stripf(plgn.players[targetName]).toLowerCase()];
	}
	//Then, set their username.
	plgn.players[targetName] = customColor;
	plgn.usernames[customLower] = targetName;
	set_name(target, customColor);
	announcer.broadcast(targetName+" is now known as "+customColor);
}

//Handle the whois command.
function handle_whois(args, self){
	//Shift the args by one.
	args.shift();
	//If the args length is 0, then tell usage.
	if (args.length == 0){
		announcer.tell("Usage: /whois <custom_name>", self);
		return;
	}

	var username = plgn.usernames[String(args.join(" ")).toLowerCase()];
	
	//If the username doesn't exist in the storage, then tell them so.
	if (!username){
		announcer.tell("That username is not registered.", self);
		return;
	}
	//Otherwise, tell them who the username is registered to.
	announcer.tell("That username is registered to "+username, self);
}

function tabcomplete_whois(sender, alias, args){
	args = args.join(" ")
	//Don't do anything if args is an empty string.
	if (args == ""){
		return [];
	}
	var arr = [];
	for (var i in plgn.players){
		var currentName = stringcolor.stripf(plgn.players[i]);
		if (currentName.toLowerCase().indexOf(args.toLowerCase()) === 0){
			arr.push(currentName);
		}
	}
	if (arr.length === 0){
		return [];
	}
	if (arr.length === 1){
		var arg = arr[0];
		for (var i=1;i<args.split(" ").length;i++){
			arg = arg.split(" ");
			arg.shift();
			arg = arg.join(" ");
		}
		return [arg];
	}
	sender.sendMessage(arr.join(", "));

	return [arr[0].split(" ")[args.split(" ").length-1]];
}

//Handle join event.
events.on("player.PlayerJoinEvent", function(l,e){
	var player 			= e.getPlayer(),
		customName 		= plgn.players[player.getName()];
	
	//If there is a custom name for the player, then set it.
	if (customName){
		//Form the join name.
		var jn = String(customName+" ("+player.getName()+")");
		e.setJoinMessage(jn+(" has joined the game".yellow()));
		set_name(player, customName);
	}
});

command.gregister("setname", handle_setname);
command.gregister("whois", handle_whois, tabcomplete_whois);