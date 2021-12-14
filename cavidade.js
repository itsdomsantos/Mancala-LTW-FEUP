class Cavidade{
    constructor(nSeeds){
      this.nSeeds = nSeeds;

      this.ele = this.draw();
    }

    draw(){
        const cav = document.createElement('div');
        cav.classList.add('cavidade');
        return cav;
    }
}

export default Cavidade;