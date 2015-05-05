//////////////////////
//JSC.plugin.greentext
//Simple plugin that imitates 4chan's quoting format
events.on("player.PlayerChatEvent", function(l,e){
	var msg = String(e.getMessage());
	if (msg[0] == ">"){
		e.setMessage(org.bukkit.ChatColor.GREEN+msg);
	}
}, "HIGHEST");