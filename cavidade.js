//class da cavidade
class Cavidade{
  constructor(nSeeds){
    this.nSeeds = nSeeds;
    this.ele = this.draw();
    this.seeds = this.create_seeds();
    this.drawSeeds(); // Novo método para inserir as sementes na DOM (ver abaixo)
  }

  draw(){ // cria a cavidade
      const cav = document.createElement('div');
      cav.classList.add('cavidade');
      return cav;
  }

  create_seeds(){ // cria o vetor de seeds para as cavidades
    const seeds = [];
    for(let i = 0; i < this.nSeeds; i++) {
        const item = new Seed();
        seeds.push(item.ele);
    }
    return seeds;
  }

  drawSeeds() { 
    this.seeds.forEach(seed => this.ele.append(seed)); 
  }
}

// class do feijão 
class Seed{
  constructor(){
    this.ele = this.draw();
  }

  draw(){ // cria o feijao
    const seed = document.createElement('div');
    seed.classList.add('feijao');
    return seed;
  }
}

export default Cavidade;