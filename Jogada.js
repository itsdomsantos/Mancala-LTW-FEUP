class Jogada{
    constructor(tabuleiro, cavidades, players, mode, difficulty){
        this.tabuleiro = tabuleiro;
        this.cavidades = cavidades;
        this.players = players;
        this.mode = mode;
        this.difficulty = difficulty;

        this.gameOver = false; // fica a true quando o jogo acaba (serve para limpar o Game Over do tabuleiro)
        this.changeTurn = 'p2'; // muda para a vez do outro jogador
        this.lastTurn = '';

        this.showWhoIsPlaying(this.changeTurn);
        this.checkIfClicked();
    }

    checkIfClicked(){ // vê se cada cavidade foi clickada  
        if(this.mode == 'computer'){ // modo vs computer
            let max_Seeds = 0;
            let cav_aux;

            if(this.difficulty == 'easy'){ // Dificuldade easy

                if(this.changeTurn == 'p1'){

                    // Escolhe a cavidade com mais sementes mais à direita
                    this.cavidades.cavTop.forEach(cav =>{
                        if(cav.nSeeds >= max_Seeds) {
                            max_Seeds = cav.nSeeds;
                            cav_aux = cav;
                        }
                    })
                    
                    this.jogada(cav_aux, cav_aux.id, this.players.p1, this.players.p2);
                }

                if(this.changeTurn == 'p2' && this.lastTurn == ''){ // this.lastTurn == '' , pois só queremos acrescentar o event na primeira vez
                    this.cavidades.cavBot.forEach(cav =>{
                        cav.ele.addEventListener('click', this.jogada.bind(this, cav, cav.id, this.players.p2, this.players.p1));
                    })
                }
            }
            else if(this.difficulty == 'medium'){ // Dificuldade medium
                if(this.changeTurn == 'p1'){
                    let found = false;

                    for(let i = this.players.p1.length-3; i >=0; i--){
                        if(this.players.p1.at(i).nSeeds == (this.players.p1.length-2 - i) ){
                            cav_aux = this.players.p1.at(i);
                            found = true;
                            break;
                        }
                    }

                    if(found == false){
                        // Escolhe a cavidade com mais sementes mais à direita
                        this.cavidades.cavTop.forEach(cav =>{
                            if(cav.nSeeds >= max_Seeds) {
                                max_Seeds = cav.nSeeds;
                                cav_aux = cav;
                            }
                        })
                    }
                    
                    this.jogada(cav_aux, cav_aux.id, this.players.p1, this.players.p2);
                }
                
                if(this.changeTurn == 'p2' && this.lastTurn == ''){ // this.lastTurn == '' , pois só queremos acrescentar o event na primeira vez
                    this.cavidades.cavBot.forEach(cav =>{
                        cav.ele.addEventListener('click', this.jogada.bind(this, cav, cav.id, this.players.p2, this.players.p1));
                    })
                }  
            }
        }
        else{ // modo online
            this.cavidades.cavBot.forEach(cav =>{        
                cav.ele.addEventListener('click', this.jogada.bind(this, cav, cav.id, this.players.p2, this.players.p1));
            })

            this.cavidades.cavTop.forEach(cav =>{        
                cav.ele.addEventListener('click', this.jogada.bind(this, cav, cav.id, this.players.p1, this.players.p2));
            })
        }  
    }

    jogada(cav, id, player, outro_Player){ // trata de cada jogada
        let seedsToTransfer = 0;
        
        if(this.gameOver == true) return; // game over

        if(player.at(player.length - 1) != this.changeTurn){ // não é a tua vez de jogar
            this.msgNoTabuleiro('É a vez do adversário!');
            return;
        }

        if(cav.nSeeds == 0){
            this.msgNoTabuleiro('Jogada Impossíel!\nTenta outra cavidade!');
            return;
        }

        cav.seeds.forEach(seed =>{
            seedsToTransfer ++;
            seed.remove();
        })

        cav.nSeeds = 0;
        cav.setNewNumberSeeds();

        let result = this.transferSeeds(player, seedsToTransfer, id, outro_Player); // começa a transferência das Seeds

        if(result != -1){ // se a última semente não caiu no armazem, vê se o outro player tem sementes para jogar, se caiu, continua a jogar pois o outro player pode vir a ter mais sementes
            if(this.check_Player_Cavs(outro_Player, player)) return; // vê se as cavidades do outro player estão todas vazias
        }

        if(result == -1){ // se a ultima semente caiu no armazem dá check às cavidades do próprio jogador, se não, não dá, pois o outro jogador ainda vai jogar
            if(this.check_Player_Cavs(player, outro_Player)) return; // vê se as cavidades do player que está a jogar ficaram vazias com a ultima jogada
        }

        this.lastTurn = this.changeTurn;

        if(result == -1) {
            if(this.mode == 'computer' && this.changeTurn == 'p1') {
                setTimeout(() => {this.checkIfClicked()}, 3000);
            }
            return; // quando a ultima seed cai no armazem joga de novo
        }

        if(this.changeTurn == 'p1') this.remove_Text_On_Board('.computer', 0);
        else this.remove_Text_On_Board('.player', 0);

        this.changeTurn = outro_Player.at(outro_Player.length - 1); // muda para a vez do outro jogador

        if(this.mode == 'computer' && this.changeTurn == 'p1') { // se estiver no modo vs computador e for a vez do computador, chama a função novamente para o computador jogar
            this.showWhoIsPlaying(this.changeTurn);
            setTimeout(() => {this.checkIfClicked()}, 3000); // 3 segundos para o computador jogar
        }
        else this.showWhoIsPlaying(this.changeTurn);
    }

    transferSeeds(player, seedsToTransfer, id, outro_Player){ // faz a transferência das Seeds recursivamente, caso chegue ao aramazem ainda com Seeds para distribuir

        for(let i = id + 1; i < player.length - 1; i++){
            if(seedsToTransfer == 0) break;

            if(player.at(i).nSeeds == 0 && seedsToTransfer == 1 && player.at(length - 1) == this.changeTurn && i != player.length - 2){
                this.steal_Seeds(i, player, outro_Player);
            }

            player.at(i).nSeeds ++;
            player.at(i).setNewNumberSeeds();

            if(seedsToTransfer == 1 && i == player.length - 2) return -1; // caso a última semente seja a do armazem

            seedsToTransfer --;

            // caso chegue ao fim das cavidades do adversário ainda com sementes para tranferir, salta o armazem do adversário e continua nas suas cavidades de baixo
            if(seedsToTransfer >= 1 && i == player.length - 3 && player.at(player.length - 1) != this.changeTurn){
                this.transferSeeds(outro_Player, seedsToTransfer, -1, player); // recursiva
                return;
            }
        }

        if(seedsToTransfer == 0) {
            return;
        }
        else{
            this.transferSeeds(outro_Player, seedsToTransfer, -1, player); // recursiva
        }  
    }

    steal_Seeds(id, player, outro_Player){
        const helper_guy = outro_Player.at(outro_Player.length - (id + 3)).nSeeds;
        outro_Player.at(outro_Player.length - (id + 3)).nSeeds = 0;
        outro_Player.at(outro_Player.length - (id + 3)).setNewNumberSeeds();

        player.at(player.length - 2).nSeeds += helper_guy;
        player.at(player.length - 2).setNewNumberSeeds();
    }

    check_Player_Cavs(player, outro_Player){
        let helper_guy = 0;
        for(let i = 0; i < player.length - 2; i++){
            if(player.at(i).nSeeds != 0){
                helper_guy = 1;
            }
        }

        if(helper_guy == 0) {
            let restOfSeeds = 0, i;
           
            for(i = 0; i < outro_Player.length - 2; i++){
                restOfSeeds += outro_Player.at(i).nSeeds;
                outro_Player.at(i).seeds.forEach(seed =>{
                    seed.remove();
                })
                outro_Player.at(i).nSeeds = 0;
                outro_Player.at(i).setNewNumberSeeds();
            }

            outro_Player.at(i).nSeeds += restOfSeeds;
            outro_Player.at(i).setNewNumberSeeds();

            this.GameOver();
            return true;
        }
    }

    showWhoIsPlaying(player){
        const msg = document.createElement('span');
        if(player == 'p1'){
            msg.innerText = "Computer's turn!";
            msg.classList.add('computer');
        }
        else{
            msg.innerText = 'Your turn!';
            msg.classList.add('player');
        }
        this.tabuleiro.append(msg);
    }

    msgNoTabuleiro(mensagem){ // jogada impossivel
        const msg = document.createElement('span');
        msg.innerText = mensagem;
        msg.classList.add('textOnBoard');
        this.tabuleiro.append(msg);
        this.remove_Text_On_Board('.textOnBoard', 1000);
    }

    remove_Text_On_Board(msgToRemove, time){ // remove a msg que está no tabuleiro
        setTimeout(() => {document.querySelector(msgToRemove).remove()}, time); // Ao fim de 1000 ms a função remove o alerta de "Jogada Impossível";
    }

    GameOver(){ // termina o jogo
        if(this.changeTurn == 'p1') this.remove_Text_On_Board('.computer', 0);
        else this.remove_Text_On_Board('.player', 0);
        const gameOver = document.createElement('span');
        if(this.players.p1.at(this.players.p1.length-2).nSeeds > this.players.p2.at(this.players.p2.length-2).nSeeds){
            gameOver.innerText = 'Computer Won! You Lost :(\n Computer: ' + this.players.p1.at(this.players.p1.length-2).nSeeds + '\n You: ' + this.players.p2.at(this.players.p2.length-2).nSeeds;
        }
        else if(this.players.p1.at(this.players.p1.length-2).nSeeds < this.players.p1.at(this.players.p1.length-2).nSeeds){
            gameOver.innerText = 'You Won The Match! :)\n Computer: ' + this.players.p1.at(this.players.p1.length-2).nSeeds + '\n You: ' + this.players.p2.at(this.players.p2.length-2).nSeeds;
        }
        else{
            gameOver.innerText = 'Close Match, That is a Tie! :|';
        }
        gameOver.classList.add('textOnBoard');
        this.tabuleiro.append(gameOver);
        this.gameOver = true;
        this.changeTurn = '';
    }
}

export default Jogada;