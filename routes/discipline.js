var express = require("express");

var router = express.Router();

var db = require("./database.js");

module.exports = router;

router.get("/listDisciplines", (req, res) => {
    db.all(
        `SELECT discipline.* FROM discipline`,
        (err, rows) => {
        if (err) {
            throw err;
        }
        res.render("discipline/listDisciplines", {
            disciplines: rows,
            title: "Список учебных курсов"
        });
    });
});

router.get("/discipline/:id", function(req, res)  {
    var discipline_id = req.params.id;

    db.get(`SELECT * FROM discipline WHERE id=?`, [discipline_id], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render("discipline/discipline", {
            discipline: rows
        });
    });
});

router.route("/addDiscipline")
    .get((req, res) => {
        res.render("discipline/addDiscipline", {
            title: "Добавление учебного курса"
        });
})

    .post((req, res) => {
        db.run(
            `INSERT INTO discipline(name) VALUES (?)`,
            [req.body.name],
            (err) => {
                if (err) {
                    throw err;
                }
                res.redirect('/listDisciplines');
            }
        );
    });

router.post("/updateDiscipline/:id", (req, res) => {
    db.run(
        `UPDATE discipline SET name=? WHERE id=?`,
        [req.body.name, req.params.id],
        (err) => {
            if (err) {
                throw err;
            }
            res.redirect('/listDisciplines');
        }
    );
});

router.post("/deleteDiscipline/:id", (req, res) => {
    db.run('DELETE FROM discipline WHERE id=?', [req.params.id],
        (err) => {
            if (err) {
                throw err;
            }
            res.redirect('/listDisciplines');
        }
    );
});

    