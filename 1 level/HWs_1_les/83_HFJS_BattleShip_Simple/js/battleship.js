
// Программа - игра Морской бой в одну строчку.
// Длина строки 8 ячеек, макс длина корабля 3 ячейки


var location1 , location2, location3; // Координаты корабля
var guesses = 0; // Общее кол-во попыток
var hits = 0; // Кол-во поподаний
var isSunk = false; // Если корабль потоплен, то тогда true

//Блок инициализации случайных координат
//В дальнейшем его тоже надо вынести в отдельный метод, но это не точно)
location1 = Math.floor(Math.random() * 5);
location2 = location1 + 1;
location3 = location2 + 1;

// TEST MODE для читеров
alert("location1 = " + location1 + "\nlocation2 = " + location2 + "\nlocation3 = " + location3);

while(!isSunk) {
	var coordinats = prompt("Введите коордиинаты корабля начиная с 0 до 7");
	
	if (coordinats == "" || coordinats == null) {
		alert("Вы ничего не ввели!");
		guesses++;
	} else if(isFinite(coordinats)) {
		if (coordinats < 0 || coordinats > 7) {
			alert("Вы вышли за пределы поля!");
			guesses++;
		} else {
			// Этот блок else потом надо вынести в отдельный метод
			if (coordinats == location1 || coordinats == location2 || coordinats == location3) {
				guesses++;
				hits++;
				if (hits == 3) {
					isSunk = true;
					alert("Корабль потоплен, Вы выйграли!!!");
				} else {
					alert("Корабль ранен, hits = " + hits );
				}
			} else {
				alert("Вы промахнулись, попробуйте еще раз");
				guesses++;
			}
		}
	} else {
		alert("Вы ввели не верные данные!");
		guesses++;
	}
}

alert("Вы потопили корабль за " + guesses + " попыток");

//Добавил 
// Блок инициализации случайных координат
// немного поменял блоки проверки на число

