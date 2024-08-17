const canvas = document.getElementById("canvas");

const draw = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(`[w: ${canvas.width}, h: ${canvas.height}]`);

  const ctx = canvas.getContext("2d");

  for (let x = 0; x < canvas.width; x += 30) {
    new Box(x, 0, 1, canvas.height, rgba(255, 255, 255, 1)).draw(ctx);
  }

  for (let y = 0; y < canvas.height; y += 30) {
    new Box(0, y, canvas.width, 1, rgba(255, 255, 255, 1)).draw(ctx);
  }
  const perlin = new PerlinNoiseGenerator();
  perlin.setSeed(111634516782378);
  //   perlin.setSeed(parseInt(Math.random() * 1000000));
  perlin.setScale(0.001, 0.003, 0.005);

  const discrete = true;

  for (var y = 0; y < canvas.height; y += 4) {
    for (var x = 0; x < canvas.width; x += 4) {
      if (discrete) {
        var v = perlin.getIntensity(x, y) < 0.5 ? 0 : 1;
        console.log(x, y, v);
        new Box(x, y, 10, 10, rgba(255, 255, 255, v)).draw(ctx);
      } else {
        var v = perlin.getIntensity(x + 0.5, y + 0.5) * 255;
        console.log(x, y, v);
        new Box(x, y, 10, 10, rgba(v, v, v, v / 255)).draw(ctx);
      }
    }
  }
};

window.addEventListener("load", draw);
window.addEventListener("resize", draw);
