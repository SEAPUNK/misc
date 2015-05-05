////////////////////
//JSC.plugin.welcome
//Simple plugin for welcoming players on join.

var separator = "=====================================================".darkpurple();
events.on("player.PlayerJoinEvent", function(l,e){
    e.getPlayer().sendMessage(separator);
    e.getPlayer().sendMessage("Welcome!".bold().gold()+" This is a generic welcome message.");
    e.getPlayer().sendMessage(separator);
});
