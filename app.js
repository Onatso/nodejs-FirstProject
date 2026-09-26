// Подключение модуля express
var express = require("express");

// Создание объекта  express
var app = express();

// Указание, что каталог public используется для хранения статических файлов
app.use(express.static("public"));

// Подключение шаблонизатора Pug.
app.set("view engine", "pug");

// Указание пути к каталогу, который хранит шаблоны в формате Pug.
app.set("views", "./views");

// Указание номера порта, через который будет запускаться приложение.
app.listen(3000);

// Определение обработчика для маршрута "/".
// request — HTTP-запрос, свойствами которого являются строки запроса, параметры, тело запроса, заголовки HTTP.
// response — HTTP-ответ, который приложение Express отправляет при получении HTTP-запроса.
app.get("/", function(request, response)  {
   // render() — функция, которая на основе шаблона (в данном случае шаблона index.pug) генерирует страницу html, которая отправляется пользователю.
    response.render("index");
});

// Определение обработчикв для маршрута "/test"
app.get("/test", function(request, response)  {
   
    response.render("test", {description: "Описание страницы"}); 
});

app.get("/information", function(request, response)  {
 
  response.render("test", {description: "На этой странице будет описание проекта"});
});

// подключение модуля student.js
var student = require('./routes/student');
app.use('/', student);

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var teacher = require('./routes/teacher');
app.use('/', teacher);

var discipline = require('./routes/discipline');
app.use('/', discipline);

