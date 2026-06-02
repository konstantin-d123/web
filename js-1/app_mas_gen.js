/*
Задача 1
Найти максимальную разницу между элементами массива.
Вернуть массив без повторяющихся элементов.
Дан массив объектов, вернуть только те, у которых isDone: true.
[
    {id: 1, idDone: true}, 
    {id: 2, idDone: false},
    {id: 3, idDone: true}
]
*/
let a = [3,4,6,2,3,5,7,9];

console.log(Math.max(...a) - Math.min(...a));

const b = [...new Set(a)];
console.log(b);

const c = [
    {id: 1, idDone: true}, 
    {id: 2, idDone: false},
    {id: 3, idDone: true}
];

let d = [];
for(let i = 0; i < c.length; i++){
    if(c[i].idDone){
        d.push(c[i]);
    }
}

let d1 = c.filter(i => i.idDone === true);

console.log(d);


/*
Задача 2
Найти элементы массива, которые больше указанного числа:
f([1, 4, 6, 3, 2], 2) -> [4, 6, 3]
Дан многомерный массив произвольной вложенности. Написать функцию, делающую из него "плоский" массив:
f([1, 4, [34, 1, 20], [6, [6, 12, 8], 6]]) -> 
[1, 4, 34, 1, 20, 6, 6, 12, 8, 6]

*/

function f1(a, n)
{
    return a.filter(i=>i>n);
}
console.log(f1([1, 4, 6, 3, 2], 2));


function f2(a){
    let res = [];
    for(let i of a){
        if(Array.isArray(i)){
            res = res.concat(f2(i));
        }else{
            res.push(i);
        }
    }
    return res;
}
console.log(f2([1, 4, [34, 1, 20], [6, [6, 12, 8], 6]]));

/*
Задача 3
Найти, сколько есть в массиве пар чисел, дающих в сумме 0:
f([-7, 12, 4, 6, -4, -12, 0]) -> 2 
f([-1, 2, 4, 7, -4, 1, -2]) -> 3
f([-1, 1, 0, 1]) -> 1
f([-1, 1, -1, 1]) -> 2
f([1, 1, 1, 0, -1]) -> 1
f([0, 0]) -> 1 
f([]) -> 0 
То же самое, но найти количество троек таких чисел.

*/
function f3(a)
{
    let res = 0;
    for(let i = 0; i < a.length; ++i)
        for(let j = i + 1; j < a.length; ++j)
                res += (a[i]+a[j]===0);
    return res;
}

console.log(f3([-1, 2, 4, 7, -4, 1, -2]))




function f4(a)
{
    let res = 0;
    for(let i = 0; i < a.length; ++i)
        for(let j = i + 1; j < a.length; ++j)
            for(let k = j + 1; k < a.length; ++k)
                res += (a[i]+a[j]+a[k]===0);
    return res;
}

console.log(f4([-1, 2, 4, 7, -4, 1, -2, 0]))

/*
Задача 1
Реализовать генератор, бесконечно возвращающий случайное число в заданном диапазоне random(n, m).
Реализовать генератор, бесконечно возвращающий очередное число из последовательности Падована.
Реализовать генератор, бесконечно возвращающий очередное простое число.

*/


function* random(n, m){
    const min = Math.min(n, m);
    const max = Math.max(n, m);
    while(true){
        yield Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

const r = random(1, 10);
console.log(r.next().value);
console.log(r.next().value);
console.log(r.next().value);

console.log('--------------------------------------');

function* p(){
    let p0 = 1, p1 = 1, p2 = 1;

    yield p0;
    yield p1;
    yield p2;

    while(true){
        const next = p0 + p1;
        yield next;
        p0 = p1;
        p1= p2;
        p2 = next;
        
    }
}



const p1 = p();
console.log(p1.next().value);
console.log(p1.next().value);
console.log(p1.next().value);
console.log(p1.next().value);
console.log(p1.next().value);
console.log(p1.next().value);
console.log(p1.next().value);
console.log(p1.next().value);


function* pp(){
    let n = 2;
    yield n;
    while(true){
        let isp = false;
        while(!isp)
        {
            ++n;
            isp = true;
            for(let i = 2; i * i <= n && isp; ++i)
                if(n % i === 0)
                    isp = false;
            if(isp)
                yield n;
        }
    }
}

console.log('--------------------------------------');


const p2 = pp();
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);
console.log(p2.next().value);


/*
Задача 2
Посчитать число вхождений букв (или слов) в строке, используя Map.
Написать функцию getPrime(n), возвращающее n-ное по счёту простое число, используя BigInt.
*/

function countLetters(s){
    const map = new Map();

    for(let c of s){
        if(c !== ' '){
            map.set(c, (map.get(c) || 0) + 1);
        }
    }
    return map;
}
console.log(countLetters('Hello world'));


function getPrime(n){

}

/*

! Результат работы функций отобразить на html-странице Добавить поля ввода данных, поле для вывода результатов и кнопку вызова функции

*/

let btn = document.getElementById('btn');
btn.addEventListener('click', function(){
    let s1 = document.getElementById('s1').value;
    let s2 = document.getElementById('s2').value;
    let res = random(s1, s2).next().value;
    document.getElementById('res').textContent = res;
});