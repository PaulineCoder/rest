function loadUsersTable() {

    const url = "http://localhost:8089/api/admin"
    const table = document.getElementById("mainTable")

    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let tr = document.createElement("tr");
                let th = document.createElement("th");
                th.setAttribute("scope", "row");
                th.appendChild(document.createTextNode(data[i].id));
                tr.appendChild(th);
                let td1 = document.createElement("td");
                td1.appendChild(document.createTextNode(data[i].name));
                tr.appendChild(td1);
                let td2 = document.createElement("td");
                td2.appendChild(document.createTextNode(data[i].surname));
                tr.appendChild(td2);
                let td3 = document.createElement("td");
                td3.appendChild(document.createTextNode(data[i].age));
                tr.appendChild(td3);
                let td4 = document.createElement("td");
                td4.appendChild(document.createTextNode(data[i].email));
                tr.appendChild(td4);
                let td5 = document.createElement("td");
                td5.appendChild(document.createTextNode(data[i].rolesWithout));
                tr.appendChild(td5);
                let warButton = document.createElement("button");
                warButton.setAttribute("type", "button");
                warButton.setAttribute("class", "btn btn-primary btn text-light");
                warButton.appendChild(document.createTextNode("Edit"));
                warButton.addEventListener("click", function () {
                    edit(data[i]);
                });
                let dangerButton = document.createElement("button");
                dangerButton.setAttribute("type", "button");
                dangerButton.setAttribute("class", "btn btn-danger btn text-light");
                dangerButton.appendChild(document.createTextNode("Delete"));
                dangerButton.addEventListener("click", function () {
                    deleteUser(data[i]);
                });
                let td6 = document.createElement("td");
                td6.appendChild(warButton);
                tr.appendChild(td6);
                let td7 = document.createElement("td");
                td7.appendChild(dangerButton);
                tr.appendChild(td7);
                table.appendChild(tr);
            }
        })
}

//JSON
function serializeForm(formNode) {
    let object = {};
    new FormData(formNode).forEach(function (value, key) {
        object[key] = value;
    })

    return JSON.stringify(object);
}

//JSON


//EDIT
function edit(data) {
    $('#idMain').val(data.id);
    $('#firstNameEdit').val(data.name);
    $('#lastNameEdit').val(data.surname);
    $('#ageEdit').val(data.age);
    $('#emailEdit').val(data.email);
    $('#passwordEdit').val(data.password);
    $('#roleNameEdit').val(data.roleName);
    $('#editModal').modal('show');
    const applicantForm = document.getElementById('editForm')
    applicantForm.addEventListener('submit', handleEditFormSubmit)
}

async function handleEditFormSubmit(event) {
    event.preventDefault()

    let data = serializeForm(event.target)
    await sendEditData(data)
}

async function sendEditData(data) {
    await fetch('/api/admin/', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: data,
    })
    closeEditModal()
}

function closeEditModal() {
    $("#editModal").modal('hide')
    $("#mainTable").empty()
    loadUsersTable()
}

// EDIT


//CURRENT
const infoCurrentUser = document.getElementById("infoCurrentUser");
let outputInfoCU = ""
fetch("http://localhost:8089/api/user/")
    .then(res => {
        return res.json();
    })
    .then(data => {
        outputInfoCU += `<strong><a class="h5">${data.name}</a></strong>
            <a>with roles:</a>
            <a>${data.rolesWithout}</a>
            <a class="text-light float-right" href="/logout" th:method="get">Logout</a>`
        infoCurrentUser.innerHTML = outputInfoCU;
    });
//CURRENT


//CREATE

const applicantCreateForm = document.getElementById('createForm')
applicantCreateForm.addEventListener('submit', handleCreateFormSubmit)

async function handleCreateFormSubmit(event) {
    event.preventDefault()

    let data = serializeForm(event.target)
    await sendCreateData(data)
}

async function sendCreateData(data) {
    await fetch('/api/admin/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data,
    })
    $("#mainTable").empty()
    document.getElementById('usersTable').click()
    $("#createForm").reset()
}

//CREATE


//DELETE
function deleteUser(data) {
    $('#idDelete').val(data.id);
    $('#firstNameDelete').val(data.name);
    $('#lastNameDelete').val(data.surname);
    $('#ageDelete').val(data.age);
    $('#emailDelete').val(data.email);
    $('#passwordDelete').val(data.password);
    $('#roleNameDelete').val(data.roleName);
    $('#deleteModal').modal();
    const applicantDeleteForm = document.getElementById('deleteForm')
    applicantDeleteForm.addEventListener('submit', handleDeleteFormSubmit)
}

function closeDeleteModal() {
    $("#deleteModal").modal('hide')
    $("#mainTable").empty()
    loadUsersTable()
}

async function handleDeleteFormSubmit(event) {
    event.preventDefault()

    let data = serializeForm(event.target)
    await sendDeleteData(data)
}


async function sendDeleteData(data) {
    await fetch('/api/admin/', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: data,
    })
    closeDeleteModal()
}

//DELETE


function loadUserPage() {
    const table = document.getElementById("mainUserTable")
    fetch("http://localhost:8089/api/user/")
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)
            let tr = document.createElement("tr");
            let th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.appendChild(document.createTextNode(data.id));
            tr.appendChild(th);
            let td1 = document.createElement("td");
            td1.appendChild(document.createTextNode(data.name));
            tr.appendChild(td1);
            let td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(data.surname));
            tr.appendChild(td2);
            let td3 = document.createElement("td");
            td3.appendChild(document.createTextNode(data.age));
            tr.appendChild(td3);
            let td4 = document.createElement("td");
            td4.appendChild(document.createTextNode(data.email));
            tr.appendChild(td4);
            let td5 = document.createElement("td");
            td5.appendChild(document.createTextNode(data.rolesWithout));
            tr.appendChild(td5);
            table.appendChild(tr);
            const navLeft = document.getElementById("navLeft")
            let outputNav = ''
            if (data.roleName === "ROLE_USER") {
                outputNav += `<nav class="nav-link active">
                    <form th:action="@{/user/}" th:method="get">
                        <a class="text-light" href="/user/" th:method="get">User</a>
                    </form>
                </nav>`
                navLeft.innerHTML = outputNav;
            } else {
                outputNav += `<nav class="nav-link">
                    <form th:action="@{/panel}" th:method="get">
                        <a href="/panel" th:method="get">Admin</a>
                    </form>
                </nav>
                <nav class="nav-link active">
                    <form th:action="@{/user/}" th:method="get">
                        <a class="text-light" href="/user/" th:method="get">User</a>
                    </form>
                </nav>`
                navLeft.innerHTML = outputNav;
            }
        })
}