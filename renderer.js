// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

//функция рендерит список карточек
//на вход узел div-row и массив карточек/объектов
let renderAdvertList = (divNode, arrCards) => {
  let divNodeParent = divNode.parentElement;

  //рендеринг массива карточек
  for (item of arrCards.values()) {
    //создаём элемент списка
    let div = document.createElement("div");
    divNodeParent.querySelector(".cards__list").appendChild(div);
    //добавим классы согласно спецификации bootstrap
    div.classList.add("col");
    div.classList.add("col-xl-3");
    div.classList.add("col-lg-4");
    div.classList.add("col-md-6");
    div.classList.add("col-12");

    //создаём тег для изображения и указываем ссылку
    let img1 = document.createElement("img");
    img1.setAttribute("src", `${item.url}`);
    img1.setAttribute("width", `100%`);

    div.appendChild(img1);

    let title = document.createElement("p");
    title.innerHTML = item.title;

    let albumId = document.createElement("p");
    albumId.innerHTML = `albumId ${item.albumId}`;

    div.appendChild(title);
    div.appendChild(albumId);
  }
};

//функция загузки произвольных данных товаров в JSON с произвольного сервера
let loadData = async function(url) {
  try {
    //загружаем данные
    const response = await fetch(url);
    let parsedData = await response.json();

    //если ОК, то берем только первые 20 объектов (для простоты)
    parsedData = parsedData.splice(0, 20);

    return parsedData;
  } catch (err) {
    alert("Ooops! Something went wrong while loading the data...");
  }
};

//Загрузить данные в формате JSON и вывести в bootstrap сетку на front
loadData("https://jsonplaceholder.typicode.com/photos").then(parsedData => {
  //рендерим список полученных объектов-карточек
  let divNode = document.querySelector(".cards__list");
  renderAdvertList(divNode, parsedData);
});
