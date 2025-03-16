
var cuentas = [
    { nombre: "Mauricio", password: 1234, saldo: 990 },
    { nombre: "Sofia", password: 1234, saldo: 500 },
    { nombre: "Zana", password: 1234, saldo: 10 }
];
console.log(cuentas);
let cuentaSeleccionada = null;

function login() {
    console.log("iniciando sesión...");
    const username = document.getElementById("username").value.trim();
    const password = parseInt(document.getElementById("password").value.trim(), 10);
    console.log("Usuario ingresado:", username);
    const cuenta = cuentas.find(c => c.nombre.toLowerCase() === username.toLowerCase());

    if (!cuenta) {
        console.log("Cuenta no encontrada");
        alert("Cuenta no encontrada");
        return;
    } else if (cuenta.password !== password) {
        console.log("Contraseña incorrecta");
        alert("Contraseña incorrecta");
        return;
    }
    cuentaSeleccionada = cuenta;
    console.log("Inicio de sesión exitoso para:", cuenta.nombre);
    document.getElementById("login").style.display = "none";
    document.getElementById("options").style.display = "block";
    document.getElementById("user-name").textContent = cuenta.nombre;
    document.getElementById("buttonMenu").style.display = "flex";
}

function consultarSaldo() {
    console.log("Consulta de saldo:", cuentaSeleccionada.saldo);
    document.getElementById("mensaje").textContent = `Saldo actual: $${cuentaSeleccionada.saldo}`;
}

function ingresarMonto() { 
    let monto = parseFloat(prompt("Ingrese el monto a depositar:"));
    console.log("Monto ingresado:", monto);
    if (isNaN(monto) || monto <= 0) {  
        alert("Monto no válido");
        return;
    }
    if (cuentaSeleccionada.saldo + monto > 990) {
        alert("No puedes tener más de $990 en la cuenta");
        return;
    }
    cuentaSeleccionada.saldo += monto;
    console.log("Nuevo saldo tras depósito:", cuentaSeleccionada.saldo);
    document.getElementById("mensaje").textContent = `Monto ingresado: $${monto}. Nuevo saldo: $${cuentaSeleccionada.saldo}`;
}

function retirarMonto() {
    let monto = parseFloat(prompt("Ingrese el monto a retirar:"));
    console.log("Monto a retirar:", monto);
    if (isNaN(monto) || monto <= 0) {
        alert("Monto no válido");
        return;
    }
    if (cuentaSeleccionada.saldo - monto < 10) {
        alert("No puedes tener menos de $10 en la cuenta");
        return;
    }
    cuentaSeleccionada.saldo -= monto;
    console.log("Nuevo saldo tras retiro:", cuentaSeleccionada.saldo);
    document.getElementById("mensaje").textContent = `Monto retirado: $${monto}. Nuevo saldo: $${cuentaSeleccionada.saldo}`;
}

function logout() {
    console.log("Cerrando sesión...");
    cuentaSeleccionada = null;
    document.getElementById("options").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("buttonMenu").style.display = "none";
    document.getElementById("mensaje").textContent = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    alert("Sesión cerrada exitosamente");
}