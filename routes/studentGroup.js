var express = require("express");
var router = express.Router();

var db = require("./database.js");

module.exports = router;

router.route("/addStudentGroup")
    .get((req, res) => {
        res.render("studentGroup/addStudentGroup", {
            title: "Добавление студенческой группы"
        })
    })
    .post((req, res) => {
        db.run(`INSERT INTO student_group(name) VALUES (?)`, [req.body.name],
            (err) => {
                if (err) {
                    throw err;
                }
                // переход к списку студенческих групп после добавления записи
                res.redirect("/listStudentGroups");
            }
        );
});

// просмотр и обновление студенческой группы
router.get("/studentGroup/:id", (req, res) =>  {
    db.get(`SELECT * FROM student_group WHERE id=?`, [req.params.id], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render("studentGroup/studentGroup", {
            studentGroup: rows,
            title: "Студенческая группа"
        });
    });
});

router.post("/updateStudentGroup/:id", (req, res) => {
    db.run(`UPDATE student_group SET name=? WHERE id=?`, [req.body.name, req.params.id],
        (err) => {
            if (err) {
                throw err;
            }
            // возвращаемся к списку студенческих групп
            res.redirect('/listStudentGroups');
        }
    );
});

router.post("/deleteStudentGroup/:id", (req, res) => {
    db.run(`DELETE FROM student_group WHERE id=?`, [req.params.id],
        (err) => {
            if (err) {
                throw err;
            }
            // возвращаемся к списку студенческих групп
            res.redirect('/listStudentGroups');
        }
    );
});