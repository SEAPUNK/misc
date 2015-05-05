var c           = org.bukkit.ChatColor,
    chatColors  = c.values();

var colors  = [
    ["&0", c.BLACK],
    ["&1", c.DARK_BLUE],
    ["&2", c.DARK_GREEN],
    ["&3", c.DARK_AQUA],
    ["&4", c.DARK_RED],
    ["&5", c.DARK_PURPLE],
    ["&6", c.GOLD],
    ["&7", c.GRAY],
    ["&8", c.DARK_GRAY],
    ["&9", c.BLUE],
    ["&a", c.GREEN],
    ["&b", c.AQUA],
    ["&c", c.RED],
    ["&d", c.LIGHT_PURPLE],
    ["&e", c.YELLOW],
    ["&f", c.WHITE],
    ["&k", c.MAGIC],
    ["&l", c.BOLD],
    ["&m", c.STRIKETHROUGH],
    ["&n", c.UNDERLINE],
    ["&o", c.ITALIC],
    ["&r", c.RESET],
    ["&!", "&"]
];

function format_string(string){
    string = String(string);
    for (var i=0;i<colors.length;i++){
        string = string.replace(new RegExp(colors[i][0], 'g'), colors[i][1]);
    }
    return string;
}

function strip_unformatted_string(string){
    string = String(string);
    for (var i=0;i<colors.length;i++){
        if (i == colors.length-1){
            string = string.replace(new RegExp(colors[i][0], 'g'), colors[i][1]);
        }
        else{
            string = string.replace(new RegExp(colors[i][0], 'g'), "");
        }
    }
    return string;
}

function strip_formatted_string(string){
    string = String(string);
    for (var i=0;i<chatColors.length;i++){
        string = string.replace(new RegExp(chatColors[i], 'g'), "");
    }
    return string;
}

exports.format = format_string;
exports.stripu = strip_unformatted_string;
exports.stripf = strip_formatted_string;