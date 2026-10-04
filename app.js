// Подключение модуля express
var express = require("express");

// Создание объекта  express
var app = express();

// Указание, что каталог public используется для хранения статических файлов
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("view engine", "hbs");

// Подключение шаблонизатора Pug.
app.set("view engine", "pug");

// Указание пути к каталогу, который хранит шаблоны в формате Pug.
app.set("views", "./views");

// Указание номера порта, через который будет запускаться приложение.
app.listen(3000);

// Определение обработчика для маршрута "/".
// request — HTTP-запрос, свойствами которого являются строки запроса, параметры, тело запроса, заголовки HTTP.
// response — HTTP-ответ, который приложение Express отправляет при получении HTTP-запроса.
app.get("/", function (request, response) {
    response.render("index", {
        title: "Главная страница"
    });
});

app.get("/test", function (request, response) {
    response.render("test", {
        title: "Тестовая страница",
        description: "Описание страницы"
    });
});

app.get("/information", function (request, response) {
    response.render("test", {
        title: "Информация",
        description: "На этой странице будет описание проекта"
    });
});

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// подключение модуля student.js
var student = require('./routes/student');
app.use('/', student);

var teacher = require('./routes/teacher');
app.use('/', teacher);

var discipline = require('./routes/discipline');
app.use('/', discipline);

var studentGroup = require('./routes/studentGroup');
app.use('/', studentGroup);

var schedule = require('./routes/schedule');
app.use('/', schedule);

// Определение обработчика для маршрута "/pugPractice"
app.get("/pugPractice", function(request, response)  {   
    response.render("pugPractice", {
        title: "Работа с шаблонизатором Pug"
    }); 
});

// Определение обработчика для маршрута "/ejsPractice"
app.get("/ejsPractice", function(request, response)  {   
  response.render("ejsPractice.ejs"); 
});

// Определение обработчика для маршрута "/hbsPractice"
app.get("/hbsPractice", function(req, res) {
    var a = 2026;
    var b = Math.floor(Math.random() * 10) + 1;

    res.render("hbsPractice.hbs", {
        title: "Работа с шаблонизатором Handlebars",
        a: a,
        b: b,
        try: b >= 5,          
        arr: [1, 2, 3, 4, 5],
        b1: b == 1,
        b2: b == 2,
        b3: b == 3
    });
});

