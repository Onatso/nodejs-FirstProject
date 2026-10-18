var express = require("express");

var router = express.Router();

var db = require("./database.js");

var uuid = require('uuid');

var fs = require('fs');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

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
            `INSERT INTO discipline(name, description) VALUES (?, ?)`,
            [req.body.name, req.body.description],
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
        `UPDATE discipline SET name=?, description=? WHERE id=?`,
        [req.body.name, req.body.description, req.params.id],
        (err) => {
            if (err) {
                throw err;
            }
            res.redirect('/discipline/' + req.params.id);
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

router.post('/uploader', multipartMiddleware, (req, res) => {
    var expansion = req.files.upload.type; // тип файла указывается так: image/png
    expansion = expansion.split('/')[1]; // из "image/png" нам нужно извлечь только png, чтобы добавить к имени файла его расширение
    fs.readFile(req.files.upload.path, (err, data) => {
        var newName = uuid.v4() + "." + expansion; // вызываем функцию v4() для того, чтобы уникальный идентификатор был сгенерирован случайным образом
        var newPath = __dirname + '/../public/uploads/' + newName;
        fs.writeFile(newPath, data, (err) => {
            if (err) {
                throw err;
            }
            else {
                html = "<script type='text/javascript'>" +
                        "var funcNum = " + req.query.CKEditorFuncNum + ";" +
                        "var url     = \"/uploads/" + newName + "\";" +
                        "var message = \"Файл успешно загружен\";" +
                        "window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);" +
                        "</script>";
                res.send(html);
            }
        });
    });
}); 

    