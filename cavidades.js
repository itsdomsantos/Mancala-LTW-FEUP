import Cavidade from "./cavidade.js"

// class que contém as cavidades do top e as do bottom
class Cavidades{
    constructor(nSeeds, nCavs){
      this.cavTop = new CavTop(nSeeds, nCavs);
      this.cavTop.cavs = this.create_Array(nCavs, nSeeds);
      this.cavBot = new CavBot(nSeeds, nCavs);
      this.cavBot.cavs = this.create_Array(nCavs, nSeeds);

      this.ele = document.getElementById('cavidades');
    }

    create_Array(nCavs, nSeeds){ // cria o vetor das cavidades tanto para as top, como par aas bottom, que por sua vez irá chamar a função que cria as seeds
      const cavidades = [];
      for(let i = 0; i < nCavs; i++) {
          const item = new Cavidade(nSeeds);
          cavidades.push(item);
      }
      return cavidades;
    }
}
  
class CavTop{ // cavidades de cima
    constructor(){
      this.cavs = null;

      this.ele = document.getElementById('top_cavidades');
    }
}
  
class CavBot{ // caviades de baixo
    constructor(){
      this.cavs = null;

      this.ele = document.getElementById('bottom_cavidades');
    }
}

export default Cavidades;