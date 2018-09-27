// Objects Evolve, remember it is a PRINCIPLE, NOT A RULE!

// A clearly broken design would be as follows.

// Breaking S ( Clearly knows too much and does too much )
// Breaking O ( Adding a new Type in the system, requires change to it)
// Breaking L ( I cannot just pass any subtype )
// Breaking I ( Make it go round... Not enough interfaces to break. Read/Write)
// Breaking D ( Abstraction rather then implementation clasic data impl )

class dot {
  constructor(private x: number, private y: number) { }
}


class Circle {
  constructor(public radius: number) { }

  goRound() {
    console.log("They see me rolling'...");
  }
}

class AreaCalculator {

  totalArea(shapes: any[]) {

    let totalArea = 0;

    for (let s of shapes) {

      if (s.type === 'rectangle') {
        totalArea += s.h * s.w;
      } else if (s instanceof Circle) {
        totalArea += Math.PI * s.radius ** 2;
      } else if (s.type === 'square') {
        totalArea += s.side ** 2;
      } else {
        totalArea += 0;
      }

    }
    console.log('AREA_TOTAL', totalArea);
  }
}

new AreaCalculator().totalArea(
  [
    { h: 3, w: 4, type: 'rectangle' },
    new Circle(5),
    new dot(123,32),
    { side: 3, type: 'square' }
  ]
);

