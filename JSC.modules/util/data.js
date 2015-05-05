////////////////
//Functions for collecting various data.
var data = {};
//Get a list of the worlds in string format.
data.getWorlds = function(){
    var worlds  = server.getWorlds().toArray(),
        arr     = [];
    for (var i=0;i<worlds.length;i++){
        arr.push(new String(worlds[i].getName()));
    }
    return arr;
};
//Get a list of the players.
data.getPlayers = function(){
    return server.getOnlinePlayers();
}

exports = data;