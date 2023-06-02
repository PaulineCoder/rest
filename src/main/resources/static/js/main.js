$('document').ready(function(){

    $('.table #editButton').on('click',function(event){
        event.preventDefault();

        var href = $(this).attr('href');

        $.get(href, function (user, status){
            $('#idMain').val(user.id);
            $('#firstNameEdit').val(user.name);
            $('#lastNameEdit').val(user.surname);
            $('#ageEdit').val(user.age);
            $('#emailEdit').val(user.email);
            $('#passwordEdit').val(user.password);
            $('#roleNameEdit').val(user.roleName);
        });

        $('#editModal').modal();
    });

    $('.table #deleteButton').on('click',function(event){
        event.preventDefault();
        var href = $(this).attr('href');
        $.get(href, function (user, status){
            $('#idDelete').val(user.id);
            $('#firstNameDelete').val(user.name);
            $('#lastNameDelete').val(user.surname);
            $('#ageDelete').val(user.age);
            $('#emailDelete').val(user.email);
            $('#passwordDelete').val(user.password);
            $('#roleNameDelete').val(user.roleName);
        });
        $('#deleteModal').modal();
    });
});
