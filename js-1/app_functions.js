/*
Задача 1
Вернуть число в обратном порядке 123 -> 321.
Вернуть число без повторяющихся цифр 111333456 -> 13456.
Посчитать, сколько раз в данном числе встречается данная цифра (1355567, 5) -> 3.
Посчитать самую длинную последовательность нулей/единиц в двоичной записи данного числа.

*/


function reverseNumber(num){
    let r = 0;
    let temp = num;

    while(temp > 0){
        r = r * 10 + temp % 10;
        temp = Math.floor(temp / 10);
    }
    return r;
}

alert(reverseNumber(123));

function removeDublicates(num)
{
    let n = num.toString();
    let res = n[0];
    for(let i = 1; i < n.length; ++i)
    {
        if(n[i] != n[i - 1])
            res += n[i];
    }
    return parseInt(res);
}

function countDigits(number, d)
{
    let n = 0;
    while(number > 0)
    {
        n += (number % 10 == d);
        number = Math.floor(number / 10);
    }
    return n;

}

alert(countDigits(12345678933, 3));


//Посчитать самую длинную последовательность нулей/единиц в двоичной записи данного числа.
function longInBinary(num){
    //let b = num.toString(2);
    
    let count_max = 0;
    let count_cur = 0;
    let last_digit = num % 2;
    while(num > 0)
    {
        if(num % 2 == last_digit)
        {
            count_cur++;
            if(count_cur > count_max)
                count_max = count_cur;
        }
        else
        {
            last_digit = 1 - last_digit;
            count_cur = 0;
        }
        num = Math.floor(num / 2);
    }
        return count_max;
}

alert(longInBinary(34));

/*
Задача 2
Найти самый первый неповторяющийся символ в строке: 'фывфавыапрс' -> 'п'.
Cгенерировать строку заданной длины из случайных символов, взятых из набора английскийх букв и цифр: (5) -> '2fvg6'.
Вернуть только уникальные символы строки: 'позволяеткопироватьтекстиз' -> 'позвляеткираьс'.

*/


function firstNoRep(str){
    for(let i = 0; i < str.length; i++){
        
        let c = str[i];
        if(str.indexOf(c) === str.lastIndexOf(c)){
            return c;
        }
    }
    return null;
}

alert(firstNoRep('фывфавыапрс'))


function generateRandom(len){
    const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let res = '';

    for(let i = 0; i < len; i++){
        const index = Math.floor(Math.random() * c.length);
        res += c[index];
    }
    return res;

}


alert(generateRandom(5));


function getUniqua(str){
    let res = '';
    for(let i=0;i<str.length;i++){
        let c = str[i];
        if(res.indexOf(c) === -1){
            res += c;
        }
    }
    return res;
}

alert(getUniqua('позволяеткопироватьтекстиз'));