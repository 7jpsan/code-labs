


interface FlatShape {
  area: () => number;
}

interface SolidShape {
  volume: () => number;
}

class Rectangle implements FlatShape {

  public constructor(
    private height: number,
    private width: number
  ) { }

  public area(): number {
    return this.height * this.width;
  }

}

class Square extends Rectangle {
  public constructor(private side: number) {
    super(side, side);
  }
}

class Triangle implements FlatShape {
  public constructor(
    private a: number,
    private b: number,
    private c: number) {
  }

  public area(): number {
    const semiP = (this.a + this.b + this.c) / 2;
    return Math.sqrt(semiP * (semiP - this.a) * (semiP - this.b) * (semiP - this.c));
  }

}

class Cube implements SolidShape, FlatShape {

  constructor(private side: number){}

  area(): number{
    return 6 * this.side**2;
  }
  volume(): number{
    return this.side**3;
  }

}

class Circle implements FlatShape {

  constructor(private radius: number){}

  area(): number{
    return Math.PI * this.radius**2;
  }

}

class Sphere implements SolidShape, FlatShape {

  constructor(private radius: number){}

  area(): number{
    return 4 * Math.PI * this.radius**2;
  }
  volume(): number{
    return 4/3 * Math.PI * this.radius**3;
  }

}

// With a SOLID structure, we now respect all the principles:
// S: Each shape knows their own value properties
// O: A new shape (respecting the interdface) won't change the AreaCalculator in any way.
// L: Doesn't matter what ACTUAL Implementation shape is passed into the calculator. It can cope with it
// I: SolidShapes and FlatShape means that classes only implement what they need.
// D: There is no dependency on a specific shape, but on the abstraction.

class AreaCalculatorSolid {

  totalArea(shapes: FlatShape[]): number {
    return shapes.map(x => x.area()).reduce((a, b) => a + b);
  }
}

console.log(new AreaCalculatorSolid().totalArea([
  new Circle(5),
  new Square(3),
  new Rectangle(3,4)
]))