$(document).ready(() => {

    moment.locale('ru');

    $("#button-edit-description").click(()=> {
        $("#value-edit-description").addClass("div-none");
        $("#form-edit-description").removeClass("div-none");
    });

    $('#student_group_id').select2({
        placeholder: "Выберите студенческую группу",
        allowClear: true,
        width: '100%'
    });

    $('#teacher_id').select2({ width: '100%' });
    $('#discipline_id').select2({ width: '100%' });
    $('#week_day').select2({ minimumResultsForSearch: Infinity, width: '100%' });
    $('#pair_number').select2({ minimumResultsForSearch: Infinity, width: '100%' });
    $('#discipline_teacher_id').select2({ width: '100%' });

    $('#date_pair').daterangepicker({
        singleDatePicker: true,
        autoApply: true,                                   
        showDropdowns: true,                               
        minDate: '2020-01-01',                             
        maxDate: moment().add(1, 'year').format('YYYY-MM-DD'), 
        opens: 'right',                                    
        drops: 'down',                                     
        locale: {
            format: 'YYYY-MM-DD'
        }
    });

});