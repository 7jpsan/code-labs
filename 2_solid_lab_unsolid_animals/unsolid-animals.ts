interface Animal{
  move: () => void;
}

class Cat implements Animal{
  private position = 0;
  walk() {
    this.position += Math.random()*100 % 10;
    console.log('Meow!');
  }

  move(){
    this.walk();
  }
}

class Fish implements Animal{
  private position = 0;
  swim(){
    this.position += Math.random()*10 * 1.5;
    console.log("glub glub");
  }
  move(){
    this.swim();
  }
}

class Bird implements Animal{
  private position = 0;
  fly(){
    this.position += Math.random()*10 / (Math.random()*10);
    console.log("Weeeeeee");
  }
  move(){
    this.fly();
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
  competitors: Animal[] = [];

  register(...a: Animal[]){
    this.competitors.push(...a);
  }

  start(){
    for (this.ticks = 0; this.ticks < this.targetTicks; this.ticks++){
      this.competitors.forEach(x => {
        x.move();
      });
    }
    console.log('Round', this.ticks, this.competitors);

  }

}

const ar = new AnimalRace()
ar.register(new Cat(), new Cat(), new Fish(), new Bird());
ar.start();