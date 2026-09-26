var express = require("express");

var router = express.Router();

module.exports = router;

var teachers = [
        { 
            id: 1,
            firstname: "Юлия",
            patronymic: "Ивановна",
            lastname: "Морозова"
        },
        {
            id: 2,
            firstname: "Артём",
            patronymic: "Павлович",
            lastname: "Медведев"
        },
        {
            id: 3,
            firstname: "Анастасия",
            patronymic: "Ивановна",
            lastname: "Белкина"
        }
];

router.get("/listTeachers", function(req, res)  {

        res.render("listTeachers", {
        teachers: teachers,
        title: "Список преподавателей"
    });  

});  

router.get("/teacher/:id", function(req, res)  {

    var teacher_id = req.params.id;

    var teacher = teachers.find(item => item.id == teacher_id);

    res.render("teacher", {
        teacher: teacher,
        title: "Преподаватель"
    });

});  