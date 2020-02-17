'use strict';

// 1. Константы.
var WIZARDS_COUNT = 4;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var LIST_OF_WIZARDS = document.querySelector('.setup-similar-list');
var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var SETUP_OPEN = document.querySelector('.setup-open');
var SETUP = document.querySelector('.setup');
var SETUP_CLOSE = SETUP.querySelector('.setup-close');
// var SETUP_SIMILAR = SETUP.querySelector('.setup-similar');
var SETUP_USER_NAME = SETUP.querySelector('.setup-user-name');
var WIZARD_COAT = SETUP.querySelector('.wizard-coat');
var WIZARD_EYES = SETUP.querySelector('.wizard-eyes');
var SETUP_FIREBALL_WRAP = SETUP.querySelector('.setup-fireball-wrap');
var COAT_INPUT = SETUP.querySelector('input[name=coat-color]');
var EYES_INPUT = SETUP.querySelector('input[name=eyes-color]');
var FIREBALL_INPUT = SETUP.querySelector('input[name=fireball-color]');

// 2. Объект с массивами данных о персонаже игры.
var WizardLibrary = {
  NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALLS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

// 3. Функция получения случайных целых чисел.
var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 4. Переменная для хранения индекса в массиве.
var elementIndex;

// 5. Функция случайного изъятия элемента из массива.
var spliceRandom = function (arr) {
  elementIndex = getRandomInt(0, arr.length - 1);
  var randomElement = arr[elementIndex];
  arr.splice(elementIndex, 1);
  return randomElement;
};

// 6. Функция сборки данных магов.
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

// 7. Функция сборки магов.
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

// 8. Запуск функции сборки магов.
LIST_OF_WIZARDS.appendChild(renderWizards(mockData(WIZARDS_COUNT)));

// 9. Открытие/закрытие окна выбора персонажа.
var onSetupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closeSetup();
  }
};

var openSetup = function () {
  SETUP.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
};

var closeSetup = function () {
  if (SETUP_USER_NAME !== document.activeElement) {
    SETUP.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscPress);
  }
};

SETUP_OPEN.addEventListener('click', function () {
  openSetup();
});

SETUP_OPEN.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openSetup();
  }
});

SETUP_CLOSE.addEventListener('click', function () {
  closeSetup();
});

SETUP_CLOSE.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closeSetup();
  }
});

// 10. Изменение внешнего вида персонажа.
// 10.1. Мантия.
var coatColorsCopy = WizardLibrary.COAT_COLOR.slice();
var eyesColorCopy = WizardLibrary.EYES_COLOR.slice();
var fireBallsCopy = WizardLibrary.FIREBALLS.slice();

var getNextColor = function (arr, element) {
  var currentItem = arr.shift();
  arr.push(currentItem);
  element.style = 'fill: ' + arr[0];
  return arr[0];
};

WIZARD_COAT.addEventListener('click', function () {
  // getNextColor(coatColorsCopy, WIZARD_COAT);
  COAT_INPUT.value = getNextColor(coatColorsCopy, WIZARD_COAT);
});

WIZARD_EYES.addEventListener('click', function () {
  // getNextColor(eyesColorCopy, WIZARD_EYES);
  EYES_INPUT.value = getNextColor(eyesColorCopy, WIZARD_EYES);
});

SETUP_FIREBALL_WRAP.addEventListener('click', function () {
  FIREBALL_INPUT.value = getNextColor(fireBallsCopy, SETUP_FIREBALL_WRAP);
  SETUP_FIREBALL_WRAP.style = 'background: ' + FIREBALL_INPUT.value;
});

// Вадидакция формы.
SETUP_USER_NAME.addEventListener('invalid', function () {
  if (SETUP_USER_NAME.validity.tooShort) {
    SETUP_USER_NAME.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (SETUP_USER_NAME.validity.tooLong) {
    SETUP_USER_NAME.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (SETUP_USER_NAME.validity.valueMissing) {
    SETUP_USER_NAME.setCustomValidity('Обязательное поле');
  } else {
    SETUP_USER_NAME.setCustomValidity('');
  }
});
