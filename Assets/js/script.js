const users = [
    {
        "id": "1",
        "name": "Parth",
        "enrollment_no": "181020105001",
        "email": "part@gmail.com",
    }
]

$(document).ready(function(){
    arrange_array(users)
    $('form').parsley();
})

function arrange_array(users)
{
    $('#table_body').html('');
    users.forEach((element,index) => {
        $('#table_body').append(`

        <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.enrollment_no}</td>
            <td>${element.email}</td>
            <td>
                <button type="button" style="color: white; margin-right: 1%;" class="btn btn-info" data-index="${index}" data-bs-toggle="modal" data-bs-target="#edit_model"><i style="font-size:20px" class="fa fa-pencil"> &nbsp;</i>Edit</button>
                <button type="button" class="btn btn-danger delete_user" data-index="${index}"><i style="font-size:20px" class="fa fa-trash-o">&nbsp;</i>Delete</button>
            </td>
        </tr>

        `);
    });
}

$(document).on('submit','#add_user', function(event)
{
    event.preventDefault();

    var formdata = new FormData(this);

    var user=
    {
        "id": formdata.get('id'),
        "name": formdata.get('name'),
        "enrollment_no": formdata.get('enrollment_no'),
        "email": formdata.get('email'),
    }

    users.push(user);
    // console.log(users)
    arrange_array(users);

    $('#add_model').modal('toggle');
    swal("Good job!", "Your data is submitted successfully!", "success");
})

$(document).on('click','.delete_user', function(){

    swal({
        title: "Are you sure?",
        text: "You want to delete student data ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            users.splice($(this).attr('data-index'),1);
            arrange_array(users);
            swal("Done!", "Your data is deleted successfully!", "success");
        } else {
          swal("Your data is safe!");
        }
      });
    
    
})

$('#edit_model').on('show.bs.modal',function(e){
    var user = users[$(e.relatedTarget).attr('data-index')];

    $('#edit_model').find('input[name="index"]').val($(e.relatedTarget).attr('data-index'))
    $('#edit_model').find('input[name="id"]').val(user.id)
    $('#edit_model').find('input[name="name"]').val(user.name)
    $('#edit_model').find('input[name="enrollment_no"]').val(user.enrollment_no)
    $('#edit_model').find('input[name="email"]').val(user.email)
});

$(document).on('submit','#update_user', function(event)
{
    event.preventDefault();

    var formdata = new FormData(this);

    // Way - 1
    // var user=
    // {
    //     "id": formdata.get('id'),
    //     "name": formdata.get('name'),
    //     "enrollment_no": formdata.get('enrollment_no'),
    //     "email": formdata.get('email'),
    // }

    // users[formdata.get('index')]=user;

    // Way - 2
    users[formdata.get('index')].id = formdata.get('id');
    users[formdata.get('index')].name = formdata.get('name');
    users[formdata.get('index')].enrollment_no = formdata.get('enrollment_no');
    users[formdata.get('index')].email = formdata.get('email');
    
    
    arrange_array(users);

    $('#edit_model').modal('toggle');
    swal("Good job!", "Your data is updated successfully!", "success");
})