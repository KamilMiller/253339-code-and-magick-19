'use strict';

// Число магов.
var NUMBER_OF_WIZARDS = 4;

// Включение вдимости элемента .setup и .setup-similar.
var setupElement = document.querySelector('.setup');
setupElement.classList.remove('hidden');
var setupSimilarBlock = document.querySelector('.setup-similar');
setupSimilarBlock.classList.remove('hidden');

// Массив с подмассивами данных о персонаже игры.
var WizardLibrary = {
  NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green']
};

// Пустой массив.
var wizards = [];

// Функция получения случайных целых чисел.
var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция сборки данных магов.
var wizardDataAssembling = function (quantity) {
  var WizardLibraryCopy = {};
  WizardLibraryCopy.NAME = WizardLibrary.NAME.slice();
  WizardLibraryCopy.SURNAME = WizardLibrary.SURNAME.slice();
  WizardLibraryCopy.COAT_COLOR = WizardLibrary.COAT_COLOR.slice();
  WizardLibraryCopy.EYES_COLOR = WizardLibrary.EYES_COLOR.slice();
  for (var i = 0; i < quantity; i++) {
    var nameIndex = getRandomInt(0, WizardLibraryCopy.NAME.length - 1);
    var coatColorIndex = getRandomInt(0, WizardLibraryCopy.COAT_COLOR.length - 1);
    var eyesColorIndex = getRandomInt(0, WizardLibraryCopy.EYES_COLOR.length - 1);
    wizards.push({
      name: WizardLibraryCopy.NAME[nameIndex],
      surname: WizardLibraryCopy.SURNAME[nameIndex],
      coatColor: WizardLibraryCopy.COAT_COLOR[coatColorIndex],
      eyesColor: WizardLibraryCopy.EYES_COLOR[eyesColorIndex]
    });
    WizardLibraryCopy.NAME.splice(nameIndex, 1);
    WizardLibraryCopy.SURNAME.splice(nameIndex, 1);
    WizardLibraryCopy.COAT_COLOR.splice(coatColorIndex, 1);
    WizardLibraryCopy.EYES_COLOR.splice(eyesColorIndex, 1);
  }
  return wizardDataAssembling;
};

// Функция сборки магов.
var wizardElementAssembling = function () {
  wizardDataAssembling(NUMBER_OF_WIZARDS);
  var LIST_OF_WIZARDS = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  for (var i = 1; i <= NUMBER_OF_WIZARDS; i++) {
    var similarWizardItem = similarWizardTemplate.cloneNode(true);
    similarWizardItem.querySelector('.setup-similar-label').textContent = wizards[i - 1].name + ' ' + wizards[i - 1].surname;
    similarWizardItem.querySelector('.wizard-coat').style.fill = wizards[i - 1].coatColor;
    similarWizardItem.querySelector('.wizard-eyes').style.fill = wizards[i - 1].eyesColor;
    fragment.appendChild(similarWizardItem);
  }
  LIST_OF_WIZARDS.appendChild(fragment);
  return wizardElementAssembling;
};

// Запуск функции сборки магов.
wizardElementAssembling();
