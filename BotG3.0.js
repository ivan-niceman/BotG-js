// ==UserScript==
// @name         TestBotG#3
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  bot for google!
// @author       Snitko Ivan
// @match        https://www.google.com/*
// @match        https://napli.ru/*
// @match 			 https://kiteuniverse.ru/*
// @match 			 https://motoreforma.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let sites = {
  "napli.ru": [
    "10 самых популярных шрифтов от Google",
    "Отключение редакций и ревизий в WordPress",
    "Вывод произвольных типов записей и полей в WordPress",
    "Взаимодействие PHP и MySQL. Подключение к базе данных MySQL",
    "Плагины VS Code",
    "DevTools - очень полезная штука",
  ],
  "kiteuniverse.ru": [
    "Kite Universe Россия",
    "Красота. Грация. Интеллект",
    "Мастер классы Kite Universe",
  ],
  "motoreforma.com": [
    "мотореформа",
    "прошивки для CAN-AM",
    "тюнинг Maverick X3",
    "тюнинг квадроциклов CAN-AM",
  ],
};

let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let keyWords = sites[site];
let keyWord = keyWords[getRandom(0, keyWords.length)];
let btnK = document.getElementsByName("btnK")[0];
let links = document.links;
let googleInput = document.getElementsByName("q")[0];
let pnnext = document.getElementById("pnnext");

if (btnK !== undefined) {
  document.cookie = `site=${site}`;
} else if (location.hostname == "www.google.com") {
  site = getCookie("site");
} else {
  site = location.hostname;
}

if (btnK !== undefined) {
  let i = 0;
  let timerId = setInterval(() => {
    googleInput.value += keyWord[i];
    i++;
    if (i == keyWord.length) {
      clearInterval(timerId);
      setTimeout(() => {
        btnK.click();
      }, getRandom(200, 500));
    }
  }, 300);
} else if (location.hostname == site) {
  setInterval(() => {
    let index = getRandom(0, links.length);
    if (getRandom(0, 101) >= 81) {
      location.href = "https://www.google.com/";
    }
    if (links.length == 0) {
      location.href = site;
    }
    if (links[index].href.indexOf(site) !== -1) {
      links[index].click();
    }
  }, getRandom(2900, 4800));
  console.log("Мы на целевом сайте");
} else {
  let nextGooglePage = true;

  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf(site) !== -1) {
      let link = links[i];
      nextGooglePage = false;
      console.log("Нашел строку " + link);
      setTimeout(() => {
        link.click();
      }, getRandom(1700, 3900));
      break;
    }
  } //цикл end
  if (document.querySelector(".YyVfkd").innerText == "5") {
    nextGooglePage = false;
    location.href = "https://www.google.com/";
  }

  if (nextGooglePage) {
    setTimeout(() => {
      pnnext.click();
    }, getRandom(3000, 4000));
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// get cookie

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
