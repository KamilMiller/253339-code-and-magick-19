'use strict';

// Константы.
var WIZARDS_COUNT = 4;
var LIST_OF_WIZARDS = document.querySelector('.setup-similar-list');
var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Скрытые элементы.
var setupElement = document.querySelector('.setup');
var setupSimilarBlock = document.querySelector('.setup-similar');


// Объект с массивами данных о персонаже игры.
var WizardLibrary = {
  NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green']
};

// Функция получения случайных целых чисел.
var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Переменная для хранения индекса в массиве.
var elementIndex;

// Функция случайного изъятия элемента из массива.
var spliceRandom = function (arr) {
  elementIndex = getRandomInt(0, arr.length - 1);
  var randomElement = arr[elementIndex];
  arr.splice(elementIndex, 1);
  return randomElement;
};

// Функция сборки данных магов.
var mockData = function (quantity) {
  var wizards = [];
  var names = WizardLibrary.NAME.slice();
  var surnames = WizardLibrary.SURNAME.slice();
  var coatColors = WizardLibrary.COAT_COLOR.slice();
  var eyesColors = WizardLibrary.EYES_COLOR.slice();
  for (var i = 0; i < quantity; i++) {
    wizards.push({
      name: spliceRandom(names),
      surname: surnames.splice(elementIndex, 1),
      coatColor: spliceRandom(coatColors),
      eyesColor: spliceRandom(eyesColors)
    });
  }
  return wizards;
};

// Функция сборки магов.
var renderWizards = function (data) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (wizard) {
    var similarWizardItem = SIMILAR_WIZARD_TEMPLATE.cloneNode(true);
    similarWizardItem.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
    similarWizardItem.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    similarWizardItem.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    fragment.appendChild(similarWizardItem);
  });
  return fragment;
};

// Раскрытие элементо ви запуск функции сборки магов.
setupElement.classList.remove('hidden');
setupSimilarBlock.classList.remove('hidden');
LIST_OF_WIZARDS.appendChild(renderWizards(mockData(WIZARDS_COUNT)));
