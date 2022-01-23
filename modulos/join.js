const crypto = require('crypto');

module.exports = async function(aux, nick, password) {
    console.log(nick, password, aux);
    let game = JSON.parse(aux);

    console.log(game);

    if(game.nick != nick || game.password != password){
        dataToSend.stat = 401;
        dataToSend.msg = {};
        return dataToSend;
    }

    let dataToSend = [];
    try{ // criar hash code para o gameId
        const gameId = crypto
            .createHash('md5')
            .update(game.group.toString())
            .digest('hex');
        dataToSend.msg = {game : gameId};
    } catch{
        dataToSend.stat = 500;
        dataToSend.msg = {};
        return dataToSend;
    }

    dataToSend.stat = 200;
    
    return dataToSend;
}