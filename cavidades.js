import Cavidade from "./cavidade.js"

class Cavidades{
    constructor(nSeeds, nCavs){
      this.cavTop = new CavTop(nSeeds, nCavs);
      this.cavTop.cavs = this.create_Array(nCavs, nSeeds);
      this.cavBot = new CavBot(nSeeds, nCavs);
      this.cavBot.cavs = this.create_Array(nCavs, nSeeds);

      this.ele = document.getElementById('cavidades');
    }

    create_Array(nCavs, nSeeds){
      const cavidades = [];
      for(let i = 0; i < nCavs; i++) {
          const item = new Cavidade(nSeeds);
          cavidades.push(item);
      }
      return cavidades;
    }
}
  
class CavTop{
    constructor(){
      this.cavs = null;

      this.ele = document.getElementById('top_cavidades');
    }
}
  
class CavBot{
    constructor(){
      this.cavs = null;

      this.ele = document.getElementById('bottom_cavidades');
    }
}

export default Cavidades;