// Игра кто хочет стать миллионером
// Пока правила просты, 3 промоха вылет из игры.
// Пока кол-во раундов зависит от суммы кол-ва вопросов в questionsBank.js (всех вместе взятых массивов в нем)
// потом раундов станет всего 15
// Игра имеет элемент неожиданности, так как мы не знаем в каком порядке мы будем получать карточки вопросы,
// учитывается только кон и в заисимости от него выбирается вопрос из соответсвующего по сложности вопросов массива,
// см. файл questionsBank.js
// Так же игру возможно расширять, т.е. наполнять её новыми вопросами, помещяя их в массив соответсвующей сложности вопросов,
// от этого ответ станет только сложнее предугадать.

var event, win = 0, losing = 0;
var maxRound = questionsFor500.length + questionsFor1000.length;
var round = 0, questionCard, costOfQuestion;

// объявляем массив для хранения использованных вопросов
var passedQuestions = [];
//=================== В этом цикле происходит игра ============================
for (round = 0; round < 15 ; round++) {	

	// =================== Test mode for dev-r =======================
	if (round < 5) {
		console.log("*** quest 500 round: " + (round + 1) + " ***");
		for (var i = 0; i < questionsFor500.length; i++) {
			console.log(questionsFor500[i][2]);
		}
		console.log("***** end of quest 500 *****");
	} else if (round >= 5 && round < 10) {
		console.log("*** quest 1000: " + (round + 1) + " ***");
		for (var i = 0; i < questionsFor1000.length; i++) {
			console.log(questionsFor1000[i][2]);
		}
		console.log("***** end of quest 1000 *****");
	}
	// так же надо сюда добавить вывод правильных ответов для разработчика
	// ================================================================	

	// Проверяем не было ли допущено 3 ошибки 
	if (losing == 3) {
		alert("Вы допустили 3 не правильных ответа!\nВесь Ваш выйгрыш сгорает\nВы проиграли!");
		break;
	}

	// Назначаем стоимость вопроса в зависимости от раунда
	if (round < 5) {
		costOfQuestion = 500;
	} else if (round >= 5 && round < 10) {
		costOfQuestion = 1000;
	}	

	// Выставляем карточку на кон/раунд при помощи функции getQuestion(round);
	questionCard = getQuestion(round);

	// Предлагаем ввести ответ на предложенный вопрос
	event = prompt("Раунд № " + (round + 1) +"\nВопрос стоимостью: " + costOfQuestion + " у.е." +"\n\n" + questionCard[0] + "\nВыход из игры -1");	if (event == -1) {
		break;
	}	

	//проверяем верный ли ответ ввел игрок
	//ответ на вопрос всегда лежит в 1й ячейке карточки
	//если ответ верный, то +500
	if (event == questionCard[1]) {
		win += costOfQuestion;
		alert("Это правильный ответ! Вы выйграли 500 у.е! Ваш общий выйгрыш: " + win);
		//Здесь надо вывести вопрос с правильным ответом
	} else {
		losing++;
		alert("Это не верный ответ! на текущий момент у вас " + losing + " промохов");
	}
}
// ============================================================================		

// Функция возвращает подмассив/карточку из массива questionsFor500
// function getQuestion(round) - возвращает карточку с вопросом на кон,
// в зависимости от кона она использует соответсвующий массив с вопросами.
function getQuestion(round) {
	var randomIndex;
	// В каждом 1 раунде игры любой вопрос считается еще не пройденным
	if (round == 0) {
		randomIndex = Math.round(Math.random() * ((questionsFor500.length - 1) - 0) + 0);
		// помечаем подмассив как сыгранный
		questionsFor500[randomIndex][2] = false;
		
		// Возвращаем вопрос выбранный случайным образом
		return questionsFor500[randomIndex];

	} else if (round < 5) {
		randomIndex = Math.round(Math.random() * ((questionsFor500.length - 1) - 0) + 0);
		while(questionsFor500[randomIndex][2] == false) {
			randomIndex = Math.round(Math.random() * ((questionsFor500.length - 1) - 0) + 0);
		}
		// как только получили порядковый номер вопроса, на который еще не отвечали, 
		// помечаем его как уже сыграный вопрос.
		questionsFor500[randomIndex][2] = false;
		
		//  и выставляем его на раунд, вернув в качестве возвратного аргумента функции
		return questionsFor500[randomIndex];

	} else if (round >= 5 && round < 10) {
		randomIndex = Math.round(Math.random() * ((questionsFor1000.length - 1) - 0) + 0);
		while(questionsFor1000[randomIndex][2] == false) {
			randomIndex = Math.round(Math.random() * ((questionsFor1000.length - 1) - 0) + 0);
		}
		// как только получили порядковый номер вопроса, на который еще не отвечали, 
		// помечаем его как уже сыграный вопрос.
		questionsFor1000[randomIndex][2] = false;
		
		//  и выставляем его на раунд, вернув в качестве возвратного аргумента функции
		return questionsFor1000[randomIndex];
	}
}