
class Cat{
  private position = 0;
  walk() {
    this.position += Math.random()*100 % 10;
    console.log('Meow!');
  }
}

class Fish{
  private position = 0;
  swim(){
    this.position += Math.random()*10 * 1.5;
    console.log("glub glub");
  }
}

class Bird{
  private position = 0;
  fly(){
    this.position += Math.random()*10 / (Math.random()*10);
    console.log("Weeeeeee");
  }
}

class LadyCatWalker{
  
  constructor(private cat: Cat){}
  
  leaveHouse(){
    this.cat.walk();
  }
}

class AnimalRace{
  ticks = 0;
  targetTicks = 10;
  competitors: any[] = [];

  register(...a: (Cat | Fish | Bird)[]){
    this.competitors.push(...a);
  }

  start(){
    for (this.ticks = 0; this.ticks < this.targetTicks; this.ticks++){
      this.competitors.forEach(x => {
        if(x instanceof Cat){
          x.walk();
        }else if(x instanceof Fish){
          x.swim();
        }else if (x instanceof Bird){
          x.fly();
        } else{
          console.log('unknown animal');
        }
      });
    }
    console.log('Round', this.ticks, this.competitors);

  }

}

const ar = new AnimalRace()
ar.register(new Cat(), new Cat(), new Fish(), new Bird());
ar.start();