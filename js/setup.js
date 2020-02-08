'use strict';

// Число магов.
var WIZARDS_COUNT = 4;

// Включение вдимости элемента .setup и .setup-similar.
var setupElement = document.querySelector('.setup');
var setupSimilarBlock = document.querySelector('.setup-similar');
setupElement.classList.remove('hidden');
setupSimilarBlock.classList.remove('hidden');

// Массив с подмассивами данных о персонаже игры.
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
var spliceRandom = function (arr, index) {
  elementIndex = index;
  var randomElement = arr[elementIndex];
  arr.splice(elementIndex, 1);
  return randomElement;
};

// Функция сборки данных магов.
var mockData = function (quantity) {
  var WizardLibraryCopy = {};
  var wizards = [];
  WizardLibraryCopy.names = WizardLibrary.NAME.slice();
  WizardLibraryCopy.surnames = WizardLibrary.SURNAME.slice();
  WizardLibraryCopy.coatColors = WizardLibrary.COAT_COLOR.slice();
  WizardLibraryCopy.eyesColors = WizardLibrary.EYES_COLOR.slice();
  for (var i = 0; i < quantity; i++) {
    wizards.push({
      name: spliceRandom(WizardLibraryCopy.names, getRandomInt(0, WizardLibraryCopy.names.length - 1)),
      surname: spliceRandom(WizardLibraryCopy.surnames, elementIndex),
      coatColor: spliceRandom(WizardLibraryCopy.coatColors, getRandomInt(0, WizardLibraryCopy.coatColors.length - 1)),
      eyesColor: spliceRandom(WizardLibraryCopy.eyesColors, getRandomInt(0, WizardLibraryCopy.eyesColors.length - 1))
    });
  }
  return wizards;
};

// Функция сборки магов.
var wizardElementAssembling = function () {
  var wizards = mockData(WIZARDS_COUNT);
  var LIST_OF_WIZARDS = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  wizards.forEach(function (wizard) {
    var similarWizardItem = similarWizardTemplate.cloneNode(true);
    similarWizardItem.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
    similarWizardItem.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    similarWizardItem.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    fragment.appendChild(similarWizardItem);
  });
  LIST_OF_WIZARDS.appendChild(fragment);
};

// Запуск функции сборки магов.
wizardElementAssembling();
