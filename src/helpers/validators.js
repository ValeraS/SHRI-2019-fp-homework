/* 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если функции будут написаны руками (без использования библиотеки) это не является ошибкой, например:
 *
 * const greaterThenOne = x => x > 1;
 * const length = x => x.length;
 * const lengthGreaterThenOne = compose(greaterThenOne, length);
 * Это — ок.
 *
 * Вот такая запись не очень хорошая, все таки потренируйтесь составлять композиции:
 * const lengthGreaterThenOne = x => x.length > 1;
 */

import {replace, length, compose, test, allPass, anyPass, lt, gt, flip, includes, not} from 'ramda';

const replaceNumbers = replace(/[^0-9]/g, '');

const getNumbersCount = compose(length, replaceNumbers);

const containsOnlyEng = test(/^[a-zA-Z0-9.+]+$/);

const lessThan = a => flip(lt)(a);
const moreThan = a => flip(gt)(a);

/**
 * Функции для проверки выполнения условий с количеством цифр в строке
 */

const numbersLessThan = v => compose(lessThan(v), getNumbersCount);
const numbersMoreThan = v => compose(moreThan(v), getNumbersCount);

/**
 * Функции для проверки выполнения условий с длиной строки
 */

const lengthLessThan = v => compose(lessThan(v), length);
const lengthMoreThan = v => compose(moreThan(v), length);

/**
 * Функции для проверки наличия конкретного символа в строке
 */

const hasNumber = includes;
const notHasNumber = n => compose(not, includes(n));


// 1. Длина < 5 и кол-во цифр > 2 шт.
export const validateFieldN1 = allPass([lengthLessThan(5), numbersMoreThan(2)]);

// 2. Длина < 5 и кол-во цифр < 2 шт.
export const validateFieldN2 = allPass([lengthLessThan(5), numbersLessThan(2)]);

// 3. Длина > 5 или кол-во цифр > 1 шт.
export const validateFieldN3 = allPass([lengthMoreThan(5), numbersMoreThan(1)]);

// 4. Длина < 10 и кол-во цифр > 2 шт. и одна из цифр равна "4"
export const validateFieldN4 = allPass([lengthLessThan(10), numbersMoreThan(2), hasNumber('4')]);

// 5. Длина < 10 и кол-во цифр > 1 шт. и ни одна из цифр не равна "4"
export const validateFieldN5 = allPass([lengthLessThan(10), numbersMoreThan(1), notHasNumber('4')]);

// 6. Длина > 5, или одна из цифр равна "7"
export const validateFieldN6 = anyPass([lengthMoreThan(5), hasNumber('7')]);

// 7. Длина > 8 и кол-во цифр > 3 шт. и только англ
export const validateFieldN7 = allPass([lengthMoreThan(8), numbersMoreThan(3), containsOnlyEng]);

// 8. Кол-во цифр < 5 шт. или только англ или одна из цифр равна "7"
export const validateFieldN8 = anyPass([numbersLessThan(5), containsOnlyEng, hasNumber('7')]);

// 9. Длина < 8, кол-во цифр > 4 шт. только англ
export const validateFieldN9 = allPass([lengthLessThan(8), numbersMoreThan(4), containsOnlyEng]);

// 10. Длина < 4 или кол-во цифр > 2 шт. или только англ
export const validateFieldN10 = anyPass([lengthLessThan(4), numbersMoreThan(2), containsOnlyEng]);
