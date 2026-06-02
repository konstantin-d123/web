/*
Задача 1 (на таймеры)
Написать функцию counter(n), которая выводит в консоль раз в секунду числа n, n-1 ... 2, 1, 0 и останавливается.

Написать функцию createCounter(n), возвращающую объект с методами:

start() -- запускает (или возобновляет) счётчик c интервалом 1 секунда: N, N-1.
pause() -- приостанавливает счёт, но не сбрасывает счётчик.
stop() -- останавливает счёт, сбрасывает счётчик.
*/

function counter(n){
    let c = n;
    const timerId = setInterval(() => {
        console.log(c);
        if(c === 0){
            clearInterval(timerId);
        }
        c--;
    }, 1000);
}

//counter(5);


function createCounter(n){
    let c = n;
    let timerId = null;
    let p = false;


    return {
        start(){
            if(timerId !== null && !p){
                return;
            }
            if(p){
                p = false;
                return;
            }
            timerId = setInterval(() => {
                if(!p){
                    console.log(c);
                    if(c === 0){
                        this.stop();
                    }
                    c--;
                }
            }, 1000);
        },
        pause(){
            if(timerId !== null && !p){
                p = true;
            }
        },
        stop(){
            if(timerId !== null){
                clearInterval(timerId);
                timerId = null;
                p = false;
                c = n;
                console.log("Счетчик сброшен");
            }
        }
    }
}


const counter1 = createCounter(5);

counter1.start();
//counter1.stop();
counter1.pause();

/*
Задача 2 (на промисы)
Написать функцию delay(N), возвращающую промис, который сделает resolve() через N секунд.
Решить задачу со счётчиком N, N-1 ... 2, 1, 0 через функцию delay.
Написать функцию, возвращающую название первого репозитория на github.com по имени пользователя 
(2 последовательных запроса: https://api.github.com/users/%USERNAME%).

*/

function delay(N){
    return new Promise(resolve => {
        setTimeout(resolve, N * 1000);
    });
}

console.log(delay(5));
async function counterWithDelay(n){
    for(let i = n; i >= 0; i--){
        console.log(i);
        if(i > 0){
            await delay(1);
        }
    }
}

counterWithDelay(5);


/*
fetch ajax
*/

function getRepo(username){
    return fetch(`https://api.github.com/users/${username}`)
    .then(response => {
        if(!response.ok){
            throw new Error(`Польщователь ${username} не найден`)
        }
        return response.json();
    })
    .then(user => {
       
        return fetch(user.repos_url);
    })
    .then(response => response.json())
    .then(repos => {
        if(repos.length === 0){
            throw new Error(`У пользователя ${username} нет репозиториев`)
        }
        return repos[0].name;
    })
    .catch(error => {
        console.log('Ошибка', error.message);
    });
}

console.log(getRepo('goryachkinama').then(name => console.log(name)));



/*
Задача 3 (на async/await)
Перепишите, используя async/await вместо .then/catch.

В функции getGithubUser замените рекурсию на цикл, используя async/await.

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}

// Запрашивается логин, пока github не вернёт существующего пользователя.
function getGithubUser() {
  let name = prompt("Введите логин?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Полное имя: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

getGithubUser();
*/

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  return await fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}

// Запрашивается логин, пока github не вернёт существующего пользователя.
async function getGithubUser() {
  let name = prompt("Введите логин?", "iliakan");

  return await loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Полное имя: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

getGithubUser();

/*9. JavaScript: запросы в сеть к сторонним API, работа с картами
Задание. Добавить настоящую карту на сайт по туризму

*/