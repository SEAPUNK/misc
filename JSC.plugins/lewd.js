//////////////////////
//JSC.plugin.lewd
//Replaces every "lewd" string with a rainbow-colored "lewd"
//r4

var c = org.bukkit.ChatColor;

var colors = [
    c.DARK_BLUE,
    c.DARK_GREEN,
    c.DARK_AQUA,
    c.DARK_RED,
    c.DARK_PURPLE,
    c.GOLD,
    c.GRAY,
    c.DARK_GRAY,
    c.BLUE,
    c.GREEN,
    c.AQUA,
    c.RED,
    c.LIGHT_PURPLE,
    c.YELLOW
];

events.on("player.PlayerChatEvent", function(l,e){
    var msg = String(e.getMessage());

    while (msg.toLowerCase().indexOf("lewd") > -1){
        msg = msg.replace(/lewd/i, generate_lewd());
    }
    e.setMessage(msg);
}, "HIGHEST");

function generate_lewd(){
    var lewd = ["L", "E", "W", "D"];

    for (var i=0;i<lewd.length;i++){
        lewd[i] = colors[Math.floor(Math.random()*(colors.length-1))]+lewd[i];
    }

    return lewd.join("")+c.RESET;
}
