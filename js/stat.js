'use strict';

var CONST_X = 100;
var CONST_Y = 10;
var TEXT_HEIGHT = 20;
var MARGIN = 40;
var PADDING_TOP = 40;
var HISTOGRAM_HEIGHT = 150;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var HISTOGRAM_BASELINE = 100;


var polygon = {
  aX: CONST_X,
  aY: CONST_Y + 10,
  bX: CONST_X + 10,
  bY: CONST_Y,
  cX: CONST_X + 410,
  cY: CONST_Y,
  dX: CONST_X + 420,
  dY: CONST_Y + 10,
  eX: CONST_X + 420,
  eY: CONST_Y + 270,
  fX: CONST_X + 410,
  fY: CONST_Y + 280,
  gX: CONST_X + 10,
  gY: CONST_Y + 280,
  hX: CONST_X,
  hY: CONST_Y + 270
};

var palette = {
  windowColor: '#ffffff',
  shadowColor: 'rgba(0, 0, 0, 0.7)',
  redBar: 'rgba(255, 0, 0, 1)',
  blueBarsShades: ['hsl(240, 15%, 50%)', 'hsl(240, 55%, 50%)', 'hsl(240, 35%, 50%)', 'hsl(240, 85%, 50%)']
};

var renderCloud = function (ctx, color, form) {
  var getOffsetX = function (object) {
    var offsetX = 0;
    if (object === 'shadow') {
      offsetX += 10;
    }
    return offsetX;
  };
  var getOffsetY = function (object) {
    var offsetY = 0;
    if (object === 'shadow') {
      offsetY += 10;
    }
    return offsetY;
  };
  ctx.beginPath();
  ctx.moveTo(polygon.aX + getOffsetX(form), polygon.aY + getOffsetY(form));
  ctx.lineTo(polygon.bX + getOffsetX(form), polygon.bY + getOffsetY(form));
  ctx.lineTo(polygon.cX + getOffsetX(form), polygon.cY + getOffsetY(form));
  ctx.lineTo(polygon.dX + getOffsetX(form), polygon.dY + getOffsetY(form));
  ctx.lineTo(polygon.eX + getOffsetX(form), polygon.eY + getOffsetY(form));
  ctx.lineTo(polygon.fX + getOffsetX(form), polygon.fY + getOffsetY(form));
  ctx.lineTo(polygon.gX + getOffsetX(form), polygon.gY + getOffsetY(form));
  ctx.lineTo(polygon.hX + getOffsetX(form), polygon.hY + getOffsetY(form));
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = Math.max.apply(null, arr); // Этот способ мне ранее не был известенб поэтому я использовал перебор массива.
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, palette.shadowColor, 'shadow');
  renderCloud(ctx, palette.windowColor);

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CONST_X + MARGIN, PADDING_TOP);
  ctx.fillText('Список результатов:', CONST_X + MARGIN, PADDING_TOP + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barX = CONST_X + MARGIN + (BAR_WIDTH + BAR_GAP) * i;
    var barY = HISTOGRAM_BASELINE + HISTOGRAM_HEIGHT - (HISTOGRAM_HEIGHT / maxTime * times[i]);
    ctx.fillStyle = '#000000';
    ctx.fillText(Math.round(times[i]), barX, barY - 10);
    ctx.fillText(players[i], barX, HISTOGRAM_BASELINE + HISTOGRAM_HEIGHT + TEXT_HEIGHT);
    if (players[i] === 'Вы') {
      ctx.fillStyle = palette.redBar;
    } else {
      ctx.fillStyle = palette.blueBarsShades[i];
    }
    ctx.fillRect(barX, barY, BAR_WIDTH, HISTOGRAM_HEIGHT / maxTime * times[i]);
  }
};
