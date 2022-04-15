const form_contact = document.getElementById('form_contact');
const inputs = document.querySelectorAll('#form_contact input');
const select = document.getElementsByName('select_contact')[0].value;
const textarea = document.getElementsByName('commit_contact')[0];

const expressions = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Correo valido.
    phone: /^\+?\d{7,15}$/, // 7 a 15 numeros.
    commit: /^[a-zA-ZÀ-ÿ\s]{20,400}$/, // Letras y espacios, pueden llevar acentos.
}


const fields = {
    name: false,
    email: false,
    phone: false,
    commit: false
}


const validateFields = (expression, input, field) => {
    if (expression.test(input.value.trim())) {
        document.querySelector(`#input_field_${field}`).classList.remove('formulario__grupo-incorrecto');
        document.querySelector(`#input_field_${field}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#input_field_${field} i`).classList.add('fa-check-circle');
        document.querySelector(`#input_field_${field} i`).classList.remove('fa-times-circle');
        document.querySelector(`#input_field_${field}`).classList.remove('formulario__input-error-activo');
        fields[field] = true;
    } else {
        document.querySelector(`#input_field_${field}`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#input_field_${field}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#input_field_${field} i`).classList.add('fa-times-circle');
        document.querySelector(`#input_field_${field} i`).classList.remove('fa-check-circle');
        document.querySelector(`#input_field_${field}`).classList.add('formulario__input-error-activo');
        fields[field] = false;
    }
}


const validateForm = (e) => {
    switch (e.target.name) {
        case 'name_contact':
            validateFields(expressions.name, e.target, 'name');
            break;
        case 'email_contact':
            validateFields(expressions.email, e.target, 'email');
            break;
        case 'tel_contact':
            validateFields(expressions.phone, e.target, 'phone');
            break;
        case 'commit_contact':
            validateFields(expressions.commit, e.target, 'commit');
            break;
    }
}


inputs.forEach(input => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});


textarea.addEventListener('keyup', validateForm);
textarea.addEventListener('blur', validateForm);


form_contact.addEventListener('submit', (e) => {
    e.preventDefault();
    if (fields.name && fields.email && fields.phone && fields.commit) {
        sendMail(inputs[0].value, inputs[1].value, inputs[2].value, select, textarea.value);
        form_contact.reset();
    } else {
        alert('Por favor, complete todos los campos.');
    }
});


function sendMail(name, email, phone, select, comment) {
    fetch('https://30kd6edtfc.execute-api.us-east-1.amazonaws.com/prod/send-email', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                select: select,
                comment: comment
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}