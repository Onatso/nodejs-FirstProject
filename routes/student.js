    var students = [
        { 
            id: 1,
            firstname: "Милана",
            patronymic: "Артёмовна",
            lastname: "Смирнова",
            dateOfBirth: "17.01.2001",
            phone: "+79134786993"
        },
        {
            id: 2,
            firstname: "Полина",
            patronymic: "Сергеевна",
            lastname: "Ефремова",
            dateOfBirth: "24.04.2007",
            phone: "+79545741338"
        },
        {
            id: 3,
            firstname: "Иван",
            patronymic: "Матвеевич",
            lastname: "Субботин",
            dateOfBirth: "26.09.2005",
            phone: "+79528717956"
        },
        {
            id: 4,
            firstname: "Ника",
            patronymic: "Артемьевна",
            lastname: "Яковлева",
            dateOfBirth: "09.10.2005",
            phone: "+79789689080"
        }
];

var express = require("express");
// Вызываем функцию Router(), чтобы создать новый объект маршрутизации. Основной уже располагается в app.js
var router = express.Router();

// Указание, что модуль является экспортируемым (теперь его можно подключать в другие модули)
module.exports = router;

router.get("/listStudents", function(req, res)  {
        res.render("listStudents", {
        students: students
    });  
});  

// :id — параметр запроса
router.get("/student/:id", function(req, res)  {
    
    // получение id студента из параметров запроса
    var student_id = req.params.id;

    // Поиск студента в массиве.
    // 1 способ - плохой способ (лучше закомментируйте его или удалите :)
    // var student = students[student_id-1];
    // 2 способ
    var student = students.find(item => item.id == student_id);

    res.render("student", {
        student: student
    });

});  

router.post("/student/:id", function(req, res)  {
    // отображение данных в терминале, которые были отправлены из формы 
    console.log(req.body)
    // переход по адресу localhost:3000/listStudents
    res.redirect("/listStudents");
}); 
