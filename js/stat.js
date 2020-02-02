'use strict';

var WINDOW_X_POSITION = 100;
var TEXT_HEIGHT = 20;
var MARGIN = 40;
var PADDING_TOP = 40;
var HISTOGRAM_HEIGHT = 150;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var HISTOGRAM_BASELINE = 100;
var TEXT_STYLE = '16px PT Mono';
var WINDOW_LEFT_BORDER = 100;
var WINDOW_RIGHT_BORDER = 520;
var WINDOW_TOP_BORDER = 10;
var WINDOW_BOTTOM_BORDER = 290;
var DELTA = 10;

var Palette = {
  TEXT_COLOR: '#000000',
  WINDOW_COLOR: '#ffffff',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
  RED_BAR: 'rgba(255, 0, 0, 1)',
  BLUE_BAR_SHADES: ['hsl(240, 15%, 50%)', 'hsl(240, 55%, 50%)', 'hsl(240, 35%, 50%)', 'hsl(240, 85%, 50%)']
};

var getOffset = function (object) {
  var offset = object ? 10 : 0;
  return offset;
};

var renderCloud = function (ctx, color, form) {
  ctx.beginPath();
  ctx.moveTo(WINDOW_LEFT_BORDER + getOffset(form), WINDOW_TOP_BORDER + DELTA + getOffset(form));
  ctx.lineTo(WINDOW_LEFT_BORDER + DELTA + getOffset(form), WINDOW_TOP_BORDER + getOffset(form));
  ctx.lineTo(WINDOW_RIGHT_BORDER - DELTA + getOffset(form), WINDOW_TOP_BORDER + getOffset(form));
  ctx.lineTo(WINDOW_RIGHT_BORDER + getOffset(form), WINDOW_TOP_BORDER + DELTA + getOffset(form));
  ctx.lineTo(WINDOW_RIGHT_BORDER + getOffset(form), WINDOW_BOTTOM_BORDER - DELTA + getOffset(form));
  ctx.lineTo(WINDOW_RIGHT_BORDER - DELTA + getOffset(form), WINDOW_BOTTOM_BORDER + getOffset(form));
  ctx.lineTo(WINDOW_LEFT_BORDER + DELTA + getOffset(form), WINDOW_BOTTOM_BORDER + getOffset(form));
  ctx.lineTo(WINDOW_LEFT_BORDER + getOffset(form), WINDOW_BOTTOM_BORDER - DELTA + getOffset(form));
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = Math.max.apply(null, arr);
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, Palette.SHADOW_COLOR, 'shadow');
  renderCloud(ctx, Palette.WINDOW_COLOR);

  ctx.fillStyle = Palette.TEXT_COLOR;
  ctx.font = TEXT_STYLE;
  ctx.fillText('Ура вы победили!', WINDOW_X_POSITION + MARGIN, PADDING_TOP);
  ctx.fillText('Список результатов:', WINDOW_X_POSITION + MARGIN, PADDING_TOP + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  players.forEach(function (item, index) {
    var barX = WINDOW_X_POSITION + MARGIN + (BAR_WIDTH + BAR_GAP) * index;
    var barY = HISTOGRAM_BASELINE + HISTOGRAM_HEIGHT - (HISTOGRAM_HEIGHT / maxTime * times[index]);
    ctx.fillStyle = Palette.TEXT_COLOR;
    ctx.fillText(Math.round(times[index]), barX, barY - 10);
    ctx.fillText(item, barX, HISTOGRAM_BASELINE + HISTOGRAM_HEIGHT + TEXT_HEIGHT);
    ctx.fillStyle = item === 'Вы' ? Palette.RED_BAR : Palette.BLUE_BAR_SHADES[index];
    ctx.fillRect(barX, barY, BAR_WIDTH, HISTOGRAM_HEIGHT / maxTime * times[index]);
  });
};
