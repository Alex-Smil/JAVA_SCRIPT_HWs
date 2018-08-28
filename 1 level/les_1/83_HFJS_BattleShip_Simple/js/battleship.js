
// Программа - игра Морской бой в одну строчку.
// Длина строки 8 ячеек, макс длина корабля 3 ячейки

var location1 = 3, location2 = 4, location3 = 5; // Координаты корабля
var guess; // Текущий номер попытки
var guesses = 0; // Общее кол-во попыток
var hits = 0; // Кол-во поподаний
var isSunk = false; // Если корабль потоплен, то тогда true

while(!isSunk) {
	var coordinats = prompt("Введите коордиинаты корабля начиная с 0 до 7");
	
	if (coordinats == "" || coordinats == null) {
		alert("Вы ничего не ввели!");
		guesses++;
	} else if (coordinats >= 0 || coordinats <= 7) {
		coordinats = parseInt(coordinats);
		if (coordinats < 0 || coordinats > 7) {
			alert("Вы ввели несуществующие координаты!");
			guesses++;
		} else {
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
		alert("Вы ввели НЕ число!");
		guesses++;
	}
}

alert("Вы потопили корабль за " + guesses + " попыток");

