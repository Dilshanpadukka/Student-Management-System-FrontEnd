const image = document.getElementById("image");

function loadTable() {
    let stdTable = document.getElementById("tblStudent");

    let body = `<thead class="thead-light"> 
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Action</th>
                    </tr>
                </thead>`;

    fetch("http://localhost:8080/student").then(res => res.json()).then(data => {
        data.forEach(element => {
            body += `<tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.address}</td>
                        <td>${element.phone}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary edit-btn mr-2" onclick="updateStudent('${element.id}', '${element.name}', '${element.address}')">✏️</button>
                            <button class="btn btn-sm btn-outline-danger delete-btn" onclick="deleteStudent(${element.id})">🗑️</button>
                        </td>
                    </tr>`;
        });
        stdTable.innerHTML = body;
    })
}

function addStudent() {
    let name = document.getElementById("txtName").value;
    let dob = document.getElementById("txtDob").value;
    let age = document.getElementById("txtAge").value;
    let email = document.getElementById("txtEmail").value;
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let mobileNumber = document.getElementById("txtMobileNumber").value;
    let address = document.getElementById("txtAddress").value;
    let city = document.getElementById("txtCity").value;
    let pinCode = document.getElementById("txtPinCode").value;
    let subStream = document.getElementById("txtSubStream").value;
    let qualification = document.getElementById("txtQualification").value;
    const img = image.files[0];

    if (name === "" || dob === "" || age === "" || email === "" || gender === "" || mobileNumber === "" || address === "" || city === "" || pinCode === "" || subStream === "" || qualification === "" || image === "") {
        alert("Please fill out all fields.");
        return;
    }

    const formData = new FormData();
    formData.append(
        "student",
        new Blob(
            [
                JSON.stringify({
                    name: name,
                    dob: dob,
                    age: age,
                    address: address,
                    city: city,
                    pinCode: pinCode,
                    email: email,
                    phone: mobileNumber,
                    qualification: qualification,
                    subStream: subStream
                }),
            ],
            { type: "application/json" }
        )
    );
    formData.append("image", img);

    const requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow"
    };

    fetch("http://localhost:8080/student", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result)
            loadTable();
            // document.getElementById("txtName").value = "";
            // document.getElementById("txtAddress").value = "";
        })
        .catch((error) => console.error(error));
}

function updateStudent(id, name, address) {
    document.getElementById('updateId').value = id;
    document.getElementById('updateName').value = name;
    document.getElementById('updateBirthDay').value = dob;
    document.getElementById('updateAge').value = age;
    document.getElementById('updateEmail').value = email;
    //document.getElementById('updateGender').value = address;
    document.getElementById('updateMobileNumber').value = mobileNumber;
    document.getElementById('updateAddress').value = address;
    document.getElementById('updateCity').value = city;
    document.getElementById('updatePinCode').value = pinCode;
    document.getElementById('updateSubStream').value = subStream;
    document.getElementById('updateQualification').value = qualification;
    document.getElementById('updateName').value = name;

    $('#updateModal').modal('show');
}

function submitUpdate() {
    let id = document.getElementById('updateId').value;
    let name = document.getElementById('updateName').value;
    let dob = document.getElementById('updateBirthDay').value;
    let age = document.getElementById('updateAge').value;
    let email = document.getElementById('updateEmail').value;
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let mobileNumber = document.getElementById('updateMobileNumber').value;
    let address = document.getElementById('updateAddress').value;
    let city = document.getElementById('updateCity').value;
    let pinCode = document.getElementById('updatePinCode').value;
    let subStream = document.getElementById('updateSubStream').value;
    let qualification = document.getElementById('updateQualification').value;
    const img = document.getElementById('image').files[0];

    if (!name || !dob || !age || !email || !gender || !mobileNumber || !address || !city || !pinCode || !subStream || !qualification || !img) {
        alert("Please fill out all fields.");
        return;
    }

    const formData = new FormData();
    formData.append("student", new Blob([JSON.stringify({
        id: id,
        name: name,
        dob: dob,
        age: age,
        email: email,
        gender: gender,
        phone: mobileNumber,
        address: address,
        city: city,
        pinCode: pinCode,
        subStream: subStream,
        qualification: qualification
    })], { type: "application/json" }));
    formData.append("image", img);

    const requestOptions = {
        method: "PUT",
        body: formData,
        redirect: "follow",
    };

    fetch("http://localhost:8080/student/image", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            $('#updateModal').modal('hide');
            loadTable();
        })
        .catch(error => console.error('Error:', error));
}

function deleteStudent(id) {
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    fetch(`http://localhost:8080/student/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            loadTable();
        })
        .catch(error => console.error('Error:', error));
}


image.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        imgPreview.src = event.target.result;
        imgPreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      imgPreview.style.display = "none";
    }
  });

loadTable();
