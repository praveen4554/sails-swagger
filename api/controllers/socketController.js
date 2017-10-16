module.exports={
    connectBS:function(req,res){

        if (!req.isSocket) {
            return res.badRequest();
        }
        sails.sockets.join(req,"roomname",function(err){
            if (err) {
                return res.serverError(err);
            }
            return res.json({
                message: 'connected to room!'
            });
        });

    },
    initSocketBroadcasting:function(req, res){
        setInterval(function(){
            sails.sockets.broadcast("roomname","message",
                "Hello World",req);
        }, 3000);
    }
}