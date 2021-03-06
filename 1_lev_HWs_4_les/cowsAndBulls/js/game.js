//Кол-во попыток которое затарит игрок на победу.
//проще говоря счетчик ходов.
var attempts = 0;

//Функция generateNumber() генерирует случайное 4х значное число 
generateNumber();
//Режим читера
alert(number);
//Функция guessNumber() задает динамику игре, также данная функция запрашивает данные от пользователя,
//после проверяет введенные данные на корректность, и проверяет правильность ответа - по средствам допольнительной функц-ии checkNumber(myresult), 
guessNumber();

// генерация случайного числа, которое надо будет угадывать.
function generateNumber(){
	//объявляем, пока что пустой, массив, для хранения угадываемого числа.
	number = [];
	//регулируем диапозон угадываемого числа.
	//указываем минимальное число в разряде, 4х значнего числа, т.е. число должно быть
	//не меньше 0 и не больше 9999
	var min = 0;
	var max = 9;
	
	//цикл для генерации угадываемого числа
	//i < 4, нам ведь 4х разрядное число нужно.
	for(var i = 0; i < 4; i++){
		//Генерим, а после округляем число в диапозоне min - max
		var part = Math.round(Math.random() * (max - min)+min);
		
		//1е число всегда уникально, поэтому оно сразу попадает в массив number = [], без проверки на дубль.
		if(i == 0){
			number[0] = part;
		}
		//По условию игры в числе не должно быть повторяющихся цифр,
		//Ищем при поиощи оператор indexOf(n) совпадения/дубликаты числа.
		//Выход из цикла возможен только если indexOf(n) вернет -1, что значит совпадений не найдено.
		else{ 
			while(number.indexOf(part) != -1){//элемент найден
				//Если дубликат найден, генерим цифру еще раз.
				part = Math.round(min + Math.random() * (max - min));
			}
			//Как только цифра уникальна, заносим в массив угадываемого числа.
			number[i] = part;
		}
	}
}

//Функция guessNumber() задает динамику игре, она опрашивает пользователя,
//и анализирует введенные им данные на корректность и правильность ответа.
function guessNumber(){
	//Запрашиваем данные у пользователя.
	var result = prompt("Введите число (-1 - закончить игру)", 0);
	//Флажок обозначающий, что игра продолжается, в случае false игра останавливается.
	var gameIsRunning = true;
	
	//Цикл в котором протекает наша игра, ориентируется на флажок gameIsRunning = true;
	while(gameIsRunning){
		//Если игрок ввел -1, то мы заканчиваем игру, так флажок gameIsRunning становится false;
		if(parseInt(result) == -1){
			gameIsRunning = false;
		}
		//Проверка на корректность введных данных, допустимы только числа
		else if(parseInt(result) == 0 || isNaN(parseInt(result))){
			alert("Вы не ввели число");
			//Также вы всегда можете выйти из игры, если она вам надоела.
			result = prompt("Введите число (-1 - закончить игру)", 0);
		}
		//Если были введены корректные данные от игрока, то:
		else{
			//Проверяем правильность ответа, описание см.ниже.
			var answer = checkNumber(result);//answer[false,1,1]
			//Если число введенное игроком совпадает на 100%
			if(answer[0]){
				alert("Поздравляем! Вы угадали число. Кол-во попыток: " + attempts);
				//Флажок выход из игры, вы же выйграли, играть некуда)
				gameIsRunning = false;
			}
			//В случае не полного совпадения числа или не совпадения вообще, выводим информацию о состянии игры,
			//с некоторыми подсказками.
			else{
				result = prompt("Быки: " + answer[1] + " Коровы: " + answer[2] + " Введите число (-1 - закончить игру)", 0);
			}
		}
	}
}

//Функция checkNumber(myresult) проверяет степень совпадения числа:
function checkNumber(myresult){//1234
	// + 1 к кол-ву попыток (счетчик ходов)
	attempts++;
	
	// массив результата
	// 0 - общий результат
	// 1 - быки
	// 2 - коровы
	//Данный массив содержит инфу о состоянии игры, т.е. 
	//answer[0] - если первый элемент массива содержит true, то это значит полная победа, игра оканчивается.
	//если же answer[0] = false, это значит, что совдания введного числа с угадываемым нет или оно не полное
	//Далее смотрим подсказки в 1 и 2 ячейке массива
	//answer[1] - Быки, если есть совпадение по значению и по месту в разряде угадываемого числа.
	//answer[2] - Коровы, если есть совпадение по значению, но числа находятся в разных разрядах. 

	//массив хранит состяние игры и подсказки.
	var answer = [false, 0, 0];
	
	// информация для разработчика, ее можно увидеть только в консоли браузера, в режиме разработчика.
	//Число которое ввел пользователь
	console.log(myresult);
	//Угадываемое число.
	console.log(number);
	
	
	//Здесь мы разделяем строку введеную игроком, на массив из отдельных символов состоящий из строки которую он ввел.
	var ranks = myresult.split("");
	
	//Далле посимвольно анализируем получившейся массив из введный строки игроком.
	//Кол-во проходок/итераций равно длине получившегося массива. 
	for(var i = 0; i < ranks.length; i++){		
		// если есть совпадение по значению и по нахождению в разряде отдельного символа
		//parseInt() здесь нужен для того, чтобы привести цыфру к числовому типу, так как данный оператор возвращает строкое значение, в виде строки.
		if(parseInt(ranks[i]) == number[i]){
			//Подсказка Быки, описание см. выше.
			answer[1]++;
		}
		//если есть совпадение по значению, но цыфры находятся в разных разрядах.
		//для этого используем оператор indexOf(), он ощет совпадение по всему масиву, в случае нахождения 
		//он возвращает индексный адрес совпавшего числа, если совпадений нет, он вернет -1
		//Нам достаточно проверять на -1, если он вернет -1 значит дубликата искомого числа в массиве нет.
		//Любое другое значение говорит о том, что где в массиве есть дубликат(его индексный адрес в этом случае вернет indexOf())
		else if(number.indexOf(parseInt(ranks[i])) != -1){
			//Подсказка Коровы, описание см. выше
			answer[2]++;
		}
	}
	
	//Если проверка на Быков) отловит 4 совпадения, то это означает полную победу,
	//Фиксируем данное событие в массиве answer[0] в первой ячейке, которая хранит состяние игры.
	if(answer[1] == 4){
		answer[0] = true;
	}
	
	//Возвращаем массив answer[] с состоянием игры(победа или играем дальше)
	//и в случае продолжения игры он хранит подсказки на совпадения, если таковые имеются.
	//На зачение answer[0] ориентируется функция guessNumber() и так же guessNumber() смотрит значение кол-ва подсказок на совпадения.
	return answer;
}