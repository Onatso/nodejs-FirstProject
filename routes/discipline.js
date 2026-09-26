var express = require("express");

var router = express.Router();

module.exports = router;

var disciplines = [
        { 
            id: 1,
            name: "Программирование"
        },
        {
            id: 2,
            name: "Экономика"
        },
        {
            id: 3,
            name: "Психология"
        }
];

router.get("/listDisciplines", function(req, res)  {

        res.render("listDisciplines", {
        disciplines: disciplines
    });  

});  

router.get("/discipline/:id", function(req, res)  {

    var discipline_id = req.params.id;

    var discipline = disciplines.find(item => item.id == discipline_id);

    res.render("discipline", {
        discipline: discipline
    });

});  