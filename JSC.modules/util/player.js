var data = require("util/data");
///////////////////
//Player functions.
var player = {};
//Teleport player to the spawn of a world.
player.toSpawn = function(player, world){
    //If no world is specified, assume the world the player is in.
    var w = (world)?server.getWorld(world):player.getWorld();
    player.teleport(w.getSpawnLocation());
};
//Run a specific function to all players.
player.doAll = function(func, args){
    var players = data.getPlayers();
    for (var i=0;i<players.length;i++){
        //If args isn't an array, make it a new one.
        if (Object.prototype.toString.call(args) !== '[object Array]'){
            args = [];
        }
        //Add the player to the beginning of array.
        args.unshift(players[i]);
        //Run the function asynchronously.
        setTimeout(function(){func.apply(func, args)});
    }
}
//Clear the inventory of a player.
player.clearInv = function(player){
    player.getInventory().clear();
};
//Heal a player.
player.heal = function(player){
    player.setHealth(player.getMaxHealth());
};

exports = player;