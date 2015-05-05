/////////////////////
//JSC.plugin.funmute
//A plugin for muting people... in a more fun way.


////////////////////////////////////////////////////////////////////////////////
var plgn_name = "FunMute",
	plgn;
if (plugin.exists(plgn_name)){
	plgn = plugin.get(plgn_name).data;
}
else{
	plgn = plugin.add(plgn_name).data;
}
////////////////////////////////////////////////////////////////////////////////

if (!plgn.muted){
	plgn.muted = {}
}

var times = {};

var messages = [
	"replaced message #1",
	"haha lol i am muted",
	"muted with the FunMute JSC plugin :^)"
];

var doReplace = function(e){
	var name = String(e.getPlayer().getName());
	if (plgn.muted[name]){
		if (String(e.getMessage())[0] == "/"){
       		e.setCancelled(true);
			e.getPlayer().sendMessage("FM> ".green()+"You can't use commands when you're muted!");
			return;
    		}
		if (!times[name]){
			times[name] = 0;
		}
		if (Date.now()-times[name] < 10000){
			e.getPlayer().sendMessage("FM> ".green()+"You've been fun-muted for annoying an admin!");
			e.setCancelled(true);
		}
		else{
			e.setMessage(messages[Math.floor(Math.random()*messages.length)]);
	        times[name] = Date.now();
		}
	}	
}

events.on("player.PlayerChatEvent", function(l,e){
	doReplace(e);
});
events.on("player.PlayerCommandPreprocessEvent", function(l,e){
	if (String(e.getMessage()).indexOf("/unmute") == 0){
		return false;
	}
	doReplace(e);
});

command.gregister("mute", function(args, self){
	if (self.isOp()){
		args = String(args.join(" ")).split(" ");
		args.shift();
		var name = args[0];
		var player = server.getPlayer(name);
		if (!player){
			self.sendMessage(name+" isn't online to mute.");
		}
		else{
			plgn.muted[name] = true;
			self.sendMessage(name+" has been muted.");
		}
	}
});

command.gregister("unmute", function(args, self){
	if (self.isOp()){
		args = String(args.join(" ")).split(" ");
		args.shift();
		var name = args[0];
		if (!plgn.muted[name]){
			self.sendMessage("That person isn't muted.");
		}
		else{
			plgn.muted[name] = false;
			self.sendMessage(name+" has been unmuted.");
		}
	}
});
