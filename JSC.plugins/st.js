///////////////
//JSC.plugin.st
//Simple plugin for striking players with lightning.
function strikeLightning(args, sender){
    if (!sender.isOp()){
        return;
    }
    var target = server.getPlayer(args[1]);
    if (target){
        target.getWorld().strikeLightning(target.getLocation());
    }
}

command.gregister("st", strikeLightning);