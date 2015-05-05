///////////////////
//JSC.plugin.harmless
//Make the person weaker than a butterfly

////////////////////////////////////////////////////////////////////////////////
var plgn_name = "Harmless"
var plgn;
if (plugin.exists(plgn_name)){
	plgn = plugin.get(plgn_name).data;
}
else{
	plgn = plugin.add(plgn_name).data;
}
////////////////////////////////////////////////////////////////////////////////

if (!plgn.muted){
	plgn.harmless = {}
}

var notifyPlayer = function(e){
	e.sendMessage("HL>".green()+" You are a harmless little butterfly :)");
}

var checkHarmless = function(name){
	if (plgn.harmless[name]){
		return true;
	}
	return false;
}

events.on("entity.EntityDamageByEntityEvent", function(l,e){
	if (!e.getDamager){
		return false;
	}
	var ent = e.getDamager();
	if (!ent || ent.getType() != "PLAYER"){
		return false;
	}
	if (checkHarmless(ent.getName())){
		notifyPlayer(ent);
		e.setCancelled(true);
	}
});

command.gregister("harmless", function(args, self){
	if (self.isOp()){
		args = String(args.join(" ")).split(" ");
		args.shift();
		var name = args[0];
		var player = server.getPlayer(name);
		if (!player){
			self.sendMessage(name+" isn't online to make harmless.");
		}
		else{
			plgn.harmless[name] = true;
			self.sendMessage(name+" has been made harmless.");
		}
	}
});

command.gregister("unharmless", function(args, self){
	if (self.isOp()){
		args = String(args.join(" ")).split(" ");
		args.shift();
		var name = args[0];
		if (!plgn.harmless[name]){
			self.sendMessage("That person isn't harmless.");
		}
		else{
			plgn.harmless[name] = false;
			self.sendMessage(name+" has been unmade harmless.");
		}
	}
});
