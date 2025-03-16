// Se declara un array de objetos que simula las cuentas de usuario con sus datos
var cuentas = [
    { nombre: "Mauricio", password: 1234, saldo: 990 }, // Usuario 1: Nombre, Contraseña, Saldo
    { nombre: "Sofia", password: 1234, saldo: 500 }, // Usuario 2
    { nombre: "Zana", password: 1234, saldo: 10 } // Usuario 3
];

// Muestra las cuentas en la consola para su verificación
console.log(cuentas);

// Se declara una variable para almacenar la cuenta seleccionada durante la sesión
let cuentaSeleccionada = null;

// Función para iniciar sesión
function login() {
    console.log("iniciando sesión...");

    // Obtiene los valores ingresados por el usuario
    const username = document.getElementById("username").value.trim(); // Obtiene el nombre de usuario
    const password = parseInt(document.getElementById("password").value.trim(), 10); // Obtiene la contraseña

    console.log("Usuario ingresado:", username);

    // Busca si existe una cuenta con el nombre ingresado (sin importar mayúsculas/minúsculas)
    const cuenta = cuentas.find(c => c.nombre.toLowerCase() === username.toLowerCase());

    // Verifica si la cuenta existe
    if (!cuenta) {
        console.log("Cuenta no encontrada");
        alert("Cuenta no encontrada"); // Muestra un mensaje si la cuenta no es encontrada
        return;
    } 
    // Verifica si la contraseña es incorrecta
    else if (cuenta.password !== password) {
        console.log("Contraseña incorrecta");
        alert("Contraseña incorrecta"); // Muestra un mensaje si la contraseña es incorrecta
        return;
    }

    // Si la cuenta y la contraseña son correctas, se almacena la cuenta seleccionada
    cuentaSeleccionada = cuenta;
    console.log("Inicio de sesión exitoso para:", cuenta.nombre);

    // Oculta el formulario de login y muestra las opciones de la cuenta
    document.getElementById("login").style.display = "none";
    document.getElementById("options").style.display = "block";
    document.getElementById("user-name").textContent = cuenta.nombre; // Muestra el nombre del usuario en la interfaz
    document.getElementById("buttonMenu").style.display = "flex"; // Muestra el menú de opciones
}

// Función para consultar el saldo de la cuenta seleccionada
function consultarSaldo() {
    console.log("Consulta de saldo:", cuentaSeleccionada.saldo);
    // Muestra el saldo en el mensaje de la interfaz
    document.getElementById("mensaje").textContent = `Saldo actual: $${cuentaSeleccionada.saldo}`;
}

// Función para ingresar un monto a la cuenta
function ingresarMonto() { 
    // Solicita al usuario ingresar el monto que desea depositar
    let monto = parseFloat(prompt("Ingrese el monto a depositar:"));
    console.log("Monto ingresado:", monto);

    // Verifica si el monto es válido (es un número y mayor que 0)
    if (isNaN(monto) || monto <= 0) {  
        alert("Monto no válido"); // Si el monto no es válido, muestra un mensaje
        return;
    }

    // Verifica si al ingresar el monto el saldo no superará los $990
    if (cuentaSeleccionada.saldo + monto > 990) {
        alert("No puedes tener más de $990 en la cuenta"); // Muestra un mensaje si se excede el límite
        return;
    }

    // Si todo es válido, actualiza el saldo de la cuenta con el monto ingresado
    cuentaSeleccionada.saldo += monto;
    console.log("Nuevo saldo tras depósito:", cuentaSeleccionada.saldo);

    // Muestra el mensaje con el monto ingresado y el nuevo saldo
    document.getElementById("mensaje").textContent = `Monto ingresado: $${monto}. Nuevo saldo: $${cuentaSeleccionada.saldo}`;
}

// Función para retirar un monto de la cuenta
function retirarMonto() {
    // Solicita al usuario ingresar el monto que desea retirar
    let monto = parseFloat(prompt("Ingrese el monto a retirar:"));
    console.log("Monto a retirar:", monto);

    // Verifica si el monto es válido (es un número y mayor que 0)
    if (isNaN(monto) || monto <= 0) {
        alert("Monto no válido"); // Muestra un mensaje si el monto no es válido
        return;
    }

    // Verifica si el retiro no dejaría la cuenta con menos de $10
    if (cuentaSeleccionada.saldo - monto < 10) {
        alert("No puedes tener menos de $10 en la cuenta"); // Muestra un mensaje si el saldo sería inferior a $10
        return;
    }

    // Si todo es válido, actualiza el saldo de la cuenta después del retiro
    cuentaSeleccionada.saldo -= monto;
    console.log("Nuevo saldo tras retiro:", cuentaSeleccionada.saldo);

    // Muestra el mensaje con el monto retirado y el nuevo saldo
    document.getElementById("mensaje").textContent = `Monto retirado: $${monto}. Nuevo saldo: $${cuentaSeleccionada.saldo}`;
}

// Función para cerrar la sesión del usuario
function logout() {
    console.log("Cerrando sesión...");

    // Restablece la cuenta seleccionada a null para indicar que no hay ninguna cuenta activa
    cuentaSeleccionada = null;

    // Oculta las opciones de la cuenta y muestra el formulario de login nuevamente
    document.getElementById("options").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("buttonMenu").style.display = "none"; // Oculta el menú de opciones

    // Limpia los valores del formulario de login
    document.getElementById("mensaje").textContent = ""; // Limpia el mensaje
    document.getElementById("username").value = ""; // Limpia el campo de nombre de usuario
    document.getElementById("password").value = ""; // Limpia el campo de contraseña

    // Muestra un mensaje de que la sesión fue cerrada
    alert("Sesión cerrada exitosamente");
}
