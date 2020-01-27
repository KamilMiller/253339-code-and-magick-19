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

var renderCloud = function (ctx, offsetX, offsetY, color) {
  ctx.beginPath();
  ctx.moveTo(CONST_X + offsetX, CONST_Y + offsetY + 10);
  ctx.lineTo(CONST_X + offsetX + 10, CONST_Y + offsetY);
  ctx.lineTo(CONST_X + offsetX + 410, CONST_Y + offsetY);
  ctx.lineTo(CONST_X + offsetX + 420, CONST_Y + offsetY + 10);
  ctx.lineTo(CONST_X + offsetX + 420, CONST_Y + offsetY + 270);
  ctx.lineTo(CONST_X + offsetX + 410, CONST_Y + offsetY + 280);
  ctx.lineTo(CONST_X + offsetX + 10, CONST_Y + offsetY + 280);
  ctx.lineTo(CONST_X + offsetX, CONST_Y + offsetY + 270);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, 10, 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 0, 0, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CONST_X + MARGIN, PADDING_TOP);
  ctx.fillText('Список результатов:', CONST_X + MARGIN, PADDING_TOP + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);
  var palette = ['hsl(240, 15%, 50%)', 'hsl(240, 55%, 50%)', 'hsl(240, 35%, 50%)', 'hsl(240, 85%, 50%)'];

  for (var i = 0; i < players.length; i++) {
    var barX = CONST_X + MARGIN + (BAR_WIDTH + BAR_GAP) * i;
    var barY = HISTOGRAM_BASELINE + HISTOGRAM_HEIGHT - (HISTOGRAM_HEIGHT / maxTime * times[i]);
    ctx.fillStyle = '#000000';
    ctx.fillText(Math.round(times[i]), barX, barY - 10);
    ctx.fillText(players[i], barX, HISTOGRAM_BASELINE + HISTOGRAM_HEIGHT + TEXT_HEIGHT);
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = palette[i];
    }
    ctx.fillRect(barX, barY, BAR_WIDTH, HISTOGRAM_HEIGHT / maxTime * times[i]);
  }
};
