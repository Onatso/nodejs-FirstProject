$(document).ready(() => {
   function getDisciplinesNotTeacher(){

        var teacher_id = $("#teacher_id").val();
        var param = {
            teacher_id: teacher_id
        };

        $('#discipline_id option').remove();

        // второй способ очистки списка
        // $('#discipline_id').empty();

        $.ajax({
            type: "POST",
            url: "/getDisciplinesNotTeacher",
            data: param,
            dataType: "json"
        }).done((data) => {
            for (var i in data) {
                $('#discipline_id').append('<option value='+data[i].id+'>' + data[i].name + '</option>');
            }
        });
    }

    function checkAttendance(){
    // получаем идентификатор выбранной в списке студенческой группы
    var student_group_id = $("#student_group_id").val();

    // получаем выбранную дату
    var date_pair = $("#date_pair").val();

    // записываем параметры, которые будем отправлять на сторону сервера в теле запроса
    var param = {
        student_group_id: student_group_id,
        date_pair: date_pair
    };

    $.ajax({
        type: "POST",
        url: "/getAttendanceData",
        data: param,
        dataType: "json"
    }).done((data) => {
        // если есть данные о посещаемости на выбранную дату, то показываем уведомление
        if(data.length > 0){
            alert("На выбранную дату уже есть отметки посещаемости");
            window.location.href = "/addAttendanceMark";
        }
    });
}
    function getFreePairNumbers() {

        var student_group_id = $("#student_group_id").val();
        var week_day = $("#week_day").val();
        var param = {
            student_group_id: student_group_id,
            week_day: week_day
        };

        $('#pair_number option').remove();

        $.ajax({
            type: "POST",
            url: "/getFreePairNumbers",
            data: param,
            dataType: "json"
        }).done((data) => {
            if (data.length === 0) {
                $('#pair_number').append('<option value="" disabled selected>Нет свободных пар</option>');
                return;
            }
            for (var i in data) {
                $('#pair_number').append('<option value='+data[i]+'>' + data[i] + '</option>');
            }
        });
    }

    if ($("#teacher_id").length) {
        $("#teacher_id").change(() => {
            getDisciplinesNotTeacher();
        });
        getDisciplinesNotTeacher();
    }

    if ($("#date_pair").length) {
        $("#date_pair").change(() => {
            checkAttendance();
        });
        checkAttendance();
    }


    if ($("#week_day").length) {
        $("#week_day").change(() => {
            getFreePairNumbers();
        });
        getFreePairNumbers();
    }

    
});