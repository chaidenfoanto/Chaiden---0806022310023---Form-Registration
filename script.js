document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah perilaku bawaan dari form saat mengirimkan data

    // Mengambil nilai dari input-form
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var dob = document.getElementById('dob').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var program = document.getElementById('program').value;
    var address = document.getElementById('address').value;
    var phone = document.getElementById('phoneNumber').value; // Perbaiki id pada elemen phone
    var motherName = document.getElementById('mother').value;
    var fatherName = document.getElementById('father').value;

    // Mengubah huruf pertama setiap kata menjadi huruf kapital
    firstName = capitalizeEachFirstLetter(firstName);
    lastName = capitalizeEachFirstLetter(lastName);
    motherName = capitalizeEachFirstLetter(motherName);
    fatherName = capitalizeEachFirstLetter(fatherName);

    // Menghitung usia berdasarkan tanggal lahir
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // Mengambil foto yang diunggah dan menampilkannya saat di-load
    var photo = document.getElementById('photo').files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        var photoUrl = event.target.result;

        // Menampilkan informasi pendaftaran
        var displayInfo = document.getElementById('displayInfo');
        displayInfo.innerHTML = `
        <hr>
        <h2>Registration Details:</h2>
        <img src="${photoUrl}" alt="Uploaded Photo" id="uploadedPhoto">
            <p><strong>Full Name : </strong> ${firstName} ${lastName}</p>
            <p><strong>Age : </strong> ${age} Years Old</p>
            <p><strong>Email : </strong> ${email}</p>
            <p><strong>Date of Birth : </strong> ${dob}</p>
            <p><strong>Gender : </strong> ${gender}</p>
            <p><strong>Program of Interest : </strong> ${program}</p>
            <p><strong>Address : </strong> ${address}</p>
            <p><strong>Phone Number : </strong> ${phone}</p>
            <p><strong>Mother's Name : </strong> ${motherName}</p>
            <p><strong>Father's Name : </strong> ${fatherName}</p>
        `;
        document.getElementsByClassName("display-info-container")[0].style.display = "block";
    };
    reader.readAsDataURL(photo); // Membaca file gambar sebagai URL

});

// Fungsi untuk mengkapitalisasi huruf pertama setiap kata
function capitalizeEachFirstLetter(string) {
    var words = string.split(' ');
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join(' ');
}

// Event listener untuk menentukan batas maksimum tanggal lahir
document.getElementById('registrationForm').addEventListener('mouseenter', function(event) {
    var today1 = new Date();
    var maxDate = new Date(today1.getFullYear() - 17, today1.getMonth(), today1.getDate());
    var maxDateISO = maxDate.toISOString().split('T')[0];
    var dobInput = document.getElementById('dob');
    dobInput.setAttribute('max', maxDateISO);
});

// Event listener untuk membatasi input hanya pada nomor telepon
document.getElementById('registrationForm').addEventListener('input', function(event) {
    var phoneNumberInput = document.getElementById('phoneNumber');
    phoneNumberInput.addEventListener('input', function(event) {
        phoneNumberInput.value = phoneNumberInput.value.replace(/\D/g, '');
    });
});
