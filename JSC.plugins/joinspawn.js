//////////////////////
//JSC.plugin.joinspawn
//Teleports new users to world spawn.
events.on("player.PlayerJoinEvent", function(l,e){
	var p = e.getPlayer();
	if (!p.hasPlayedBefore()){
		p.teleport(p.getWorld().getSpawnLocation());
	}
});
