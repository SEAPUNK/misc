//////////////
//Conversions.
var conv = {};
//Convert player's location to string.
conv.locationToString = function(location, yp){
    var x       = location.getX(),
        y       = location.getY(),
        z       = location.getZ(),
        world   = String(location.getWorld().getName()),
        yaw     = location.getYaw(),
        pitch   = location.getPitch();
    return String(world+"|"+x+"|"+y+"|"+z+((yp)?("|"+yaw+"|"+pitch):""));
}
//Convert string to location.
conv.stringToLocation = function(string){
    var arr = string.split("|");
    //If we don't have arr[4/5] (yaw/pitch), then set them to 0.
    if (!arr[4]){arr[4]=0;}
    if (!arr[5]){arr[5]=0;}
    //Make and return the location object.
    return new org.bukkit.Location(
        server.getWorld(arr[0]),
        arr[1],
        arr[2],
        arr[3],
        arr[4],
        arr[5]
    );
}

exports = conv;