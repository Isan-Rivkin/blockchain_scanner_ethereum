var express = require('express');
var router = express.Router();
var io = null;
var request = require("request");
var cheerio = require("cheerio");
url ='http://www.ethernodes.org/network/1';



function getMiners(callback){
    request({
        uri: url,
    }, function(error, response, body) {
        var parsedHtml = cheerio.load(body);
        parsedHtml('script').get().forEach(element=>{
            //console.log(element.attribs['graphData']);
        })
        //console.log(parsedHtml('script').get()[0].attribs['graphData']);
        var scripts = parsedHtml('script').filter(function() {
            return (parsedHtml(this).html().indexOf('var graphData =') > -1);
        });
        if (scripts.length === 1) {
            var text = parsedHtml(scripts[0]).html();
            var json = '{"cords":' +text.replace('var graphData = ',"") + '}';
            var coordinates = JSON.parse(json)['cords'];
            callback(coordinates);
        }else{
            callback(null);
        }
    });
}

module.exports = {
    router:router,
    setIO: function(iop){
        io = iop;
        io.on('connection',function(socket){
            socket.on('get_miners',function(){
                    getMiners(minersList=>{
                    socket.emit('post_miners',{cords:minersList});
                });
            });
        });
    }
};


