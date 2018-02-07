var Twitter = require ('twitter');

var client = new Twitter({
    consumer_key:'zSVcb2lWrVTTQHmAUfFsB4GkE',
    consumer_secret:'NM1Uaax5uBC7cKH9dfcJwI1EleccupOig6vyiH4DHF3perPXO1',
    access_token_key:'960974289389473792-HRTgVrw5q8F4M1rfjYDThb5ai0cCqfq',
    access_token_secret:'G6SnXCYRvSY3srD6LuBWO4x7MG93DHf8c94uVFj6RChSI'
});


module.exports.tweet = function(message,callback){
    client.post('statuses/update', {status: message.toString()},  function(error, tweet, response) {
        if(error) throw error;
        if(callback != null)
            callback(tweet,response);
        // console.log(tweet);  // Tweet body.
        // console.log(response);  // Raw response object.
    });
}



