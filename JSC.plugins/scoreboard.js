//////////////////////////
//JSC.plugin.tpscoreboard
//Keep track of how long a player has been on a server.

//Dependencies:
//JSC.plugin.customname

////////////////////////////////////////////////////////////////////////////////
var plgn_name = "TPScoreboard";
var plgn;
if (plugin.exists(plgn_name)){
	plgn = plugin.get(plgn_name).data;
}
else{
	plgn = plugin.add(plgn_name).data;
}
////////////////////////////////////////////////////////////////////////////////

var players = {};
if (!plgn.playerstats){
	var s = server.getScoreboardManager().getMainScoreboard(),
		o = s.getObjective("timePlayed");
	plgn.playerstats = {};
	var ofp = server.getOfflinePlayers();
	for (p in ofp){
		plgn.playerstats[String(ofp[p].getName())] = o.getScore(ofp[p]).getScore();
	}
	var ofp = server.getOnlinePlayers();
	for (p in ofp){
		plgn.playerstats[String(ofp[p].getName())] = o.getScore(ofp[p]).getScore();
	}
}
var playerstats = plgn.playerstats;
var logger = new (require("logger"))({
	prefix: "scoreboard"
});

var onlinePlayers = server.getOnlinePlayers();
for (var a in onlinePlayers){
	var player = String(onlinePlayers[a].getName());
	(function(player){
		players[player] = setTimeout(function(){incrementStat(player);}, 60000);
	})(player);
}

events.on("player.PlayerJoinEvent", function(l,e){
	var player = String(e.getPlayer().getName());
	(function(player){
		players[player] = setTimeout(function(){incrementStat(player)}, 60000);
	})(player);
});

events.on("player.PlayerQuitEvent", function(l,e){
	var player = String(e.getPlayer().getName());
	clearTimeout(players[player]);
});

function incrementStat(player){
	playerstats[player] = (typeof playerstats[player] != "undefined")?(playerstats[player]+1):0;
	reloadStats();
	(function(player){
		players[player] = setTimeout(function(){incrementStat(player)}, 60000);
	})(player);
}

//Determine list name, copied from customname.js
function determine_list_name(customName){
	var stringcolor = require("util/string/color");
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

function reloadStats(){
	var s = server.getScoreboardManager().getMainScoreboard();
	try{
		s.getObjective("timePlayed").unregister();
	}catch(e){}
	var obj = s.registerNewObjective("timePlayed", "dummy");
	obj.setDisplayName("Time spent (minutes)");
	obj.setDisplaySlot(org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
	var va = [];
	var cn = plugin.get("CustomName").data;
	for (p in playerstats){
		va.push({
			pla:p,
			val:playerstats[p]
		});
	}
	va.sort(function(a,b){
		if (a.val < b.val)
			return 1;
		if (a.val > b.val)
			return -1;
		return 0;
	});
	for (var i=0;i<10;i++){
		if (va[i]){
			if (cn.players[va[i].pla]){
				var nametouse = determine_list_name(cn.players[va[i].pla]);
			}
			else{
				var nametouse = va[i].pla;
			}
			obj.getScore(server.getOfflinePlayer(nametouse)).setScore(va[i].val);
		}
		else{
			break;
		}
	}
}
reloadStats();