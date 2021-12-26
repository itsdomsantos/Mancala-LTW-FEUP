import Cavidades from "./cavidades.js";
import Armazem from "./armazem.js";


class Tabuleiro{// class do tabuleiro
    constructor(nSeeds, nCavs){
      this.cavidades = new Cavidades(nSeeds, nCavs);
      this.armazemLeft = new Armazem(0);
      this.armazemRight = new Armazem(0);
      this.gameOver = false; // fica a true quando o jogo acaba (serve para limpar o Game Over do tabuleiro)
      this.changeTurn = 'p2'; // muda para a vez do outro jogador

      this.players = {p1:this.create_player(this.armazemLeft, this.cavidades.cavTop, 'p1'), p2: this.create_player(this.armazemRight, this.cavidades.cavBot, 'p2')}
      this.players.p1.reverse(); // inverte os elementos para o player de cima ser tratado da mesma forma que o de baixo
      this.players.p1.push('p1');
      this.players.p2.push('p2');

      this.tabuleiro = document.getElementById('tabuleiro');

      this.draw_objects();
      this.checkIfClicked();
    }

    draw_objects(){ // desenha o tabuleiro
        this.tabuleiro.prepend(this.armazemLeft.ele);

        this.cavidades.cavTop.forEach(cav =>{
            this.cavidades.cavTop.ele.append(cav.ele); // As cavidades são inseridas como elementos filhos do elemento cavTop
        })

        this.cavidades.cavBot.forEach(cav =>{
            this.cavidades.cavBot.ele.append(cav.ele); // As cavidades são inseridas como elementos filhos do elemento cavBot
        })

        this.tabuleiro.append(this.armazemRight.ele);
    }

    create_player(armazem, cavs, p){ // cria os jogadores
        const player = [];
        if(p == 'p1'){
            player.push(armazem);
            cavs.reverse();
        } 

        cavs.forEach(cav =>{
            player.push(cav);
        })
        
        if(p == 'p2') player.push(armazem);
        return player;
    }

    clean_board(){ // limpa o tabuleiro
        this.armazemLeft.ele.remove(); 
        this.armazemRight.ele.remove(); 

        this.players = {};
        this.cavidades.cavTop.ele.innerHTML = '';
        this.cavidades.cavBot.ele.innerHTML = '';
    }

    checkIfClicked(){ // vê se cada cavidade foi clickada
        this.cavidades.cavTop.forEach(cav =>{
            cav.ele.addEventListener('click', this.jogada.bind(this, cav, cav.id, this.players.p1, this.players.p2));
        })

        this.cavidades.cavBot.forEach(cav =>{        
            cav.ele.addEventListener('click', this.jogada.bind(this, cav, cav.id, this.players.p2, this.players.p1));
        })
    }

    jogada(cav, id, player, outro_Player){ // trata de cada jogada
        let seedsToTransfer = 0;
        
        if(this.gameOver == true) return;

        if(player.at(player.length - 1) != this.changeTurn){
            this.notYourTurn();
            return;
        }

        if(cav.nSeeds == 0){
            this.jogada_Impossible();
            return;
        }

        cav.seeds.forEach(seed =>{
            seedsToTransfer ++;
            seed.remove();

            cav.nSeeds = 0;
            cav.setNewNumberSeeds();
        })

        let result = this.transferSeeds(player, seedsToTransfer, id, outro_Player); // começa a transferência das Seeds

        if(this.check_Player_Cavs(player)) return; // vê se as cavidades do player que está a jogar ficaram vazias com a ultima jogada

        if(this.check_Player_Cavs(outro_Player)) return; // vê se as cavidades do outro player estão todas vazias

        if(result == -1) return; // quando a ultima seed cai no armazem joga de novo

        this.changeTurn = outro_Player.at(outro_Player.length - 1); // muda para a vez do outro jogador
    }

    transferSeeds(player, seedsToTransfer, id, outro_Player){ // faz a transferência das Seeds recursivamente, caso chegue ao aramazem ainda com Seeds para distribuir

        for(let i = id + 1; i < player.length - 1; i++){
            if(seedsToTransfer == 0) break;

            if(player.at(i).nSeeds == 0 && seedsToTransfer == 1 && player.at(length - 1) == this.changeTurn && player.at(i) != player.at(player.length - 2)){
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

    check_Player_Cavs(player){
        let helper_guy = 0;
        for(let i = 0; i < player.length - 2; i++){
            if(player.at(i).nSeeds != 0){
                helper_guy = 1;
            }
        }

        if(helper_guy == 0) {
            this.GameOver();
            return true;
        }
    }

    jogada_Impossible(){ // jogada impossivel
        const impossivel = document.createElement('span');
        impossivel.innerText = 'Jogada Impossível';
        impossivel.classList.add('textOnBoard');
        this.tabuleiro.append(impossivel);
        this.remove_Text_On_Board();
    }

    notYourTurn(){ // não é a tua vez (msg)
        const notYourTurn = document.createElement('span');
        notYourTurn.innerText = 'É a vez do adversário!';
        notYourTurn.classList.add('textOnBoard');
        this.tabuleiro.append(notYourTurn);
        this.remove_Text_On_Board();
    }

    remove_Text_On_Board(){ // remove a msg que está no tabuleiro
        setTimeout(() => {document.querySelector('.textOnBoard').remove()}, 1000); // Ao fim de 1000 ms a função remove o alerta de "Jogada Impossível";
    }

    GameOver(){ // termina o jogo
        const gameOver = document.createElement('span');
        if(this.armazemLeft.nSeeds > this.armazemRight.nSeeds){
            gameOver.innerText = 'Player 1 Won! You Lost :(';
        }
        else if(this.armazemLeft.nSeeds < this.armazemRight.nSeeds){
            gameOver.innerText = 'You Won The Match! :)';
        }
        else{
            gameOver.innerText = 'Close Match, That is a Tie! :|';
        }
        gameOver.classList.add('textOnBoard');
        this.tabuleiro.append(gameOver);
        this.gameOver = true;
    }
}

export default Tabuleiro;