export function clear(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function render(ctx, model, showDiscontent) {
  const spacing  = 1;
  const size     = ctx.canvas.width;
  const elements = model.size;
  const s        = (size - (elements + 1) * spacing) / elements;

  for (let i = 0; i < elements; i += 1) {
    for (let j = 0; j < elements; j += 1) {
      const x = (i + 1) * spacing + i * s;
      const y = (j + 1) * spacing + j * s;

      const point = { x: i, y: j };

      switch (model.element(point)) {
        case 'A':
          if (!showDiscontent || model.content(point, 'A')) {
            ctx.fillStyle = '#ffad3c';
            ctx.fillRect(x, y, s, s);
          } else {
            ctx.strokeRect(x, y, s, s);
          }
          break;
        case 'B':
          if (!showDiscontent || model.content(point, 'B')) {
            ctx.fillStyle = '#3c8ed2';
            ctx.beginPath();
            ctx.arc(x + s / 2, y + s / 2, s / 2, 0, 2 * Math.PI);
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(x + s / 2, y + s / 2, s / 2, 0, 2 * Math.PI);
            ctx.stroke();
          }
          break;
        case 'O':
          break;
      }
    }
  }
}
