import './style.css';

const nombrepaciente = document.querySelector("#nombrepaciente");
const telefonopaciente = document.querySelector("#telefonopaciente");
const edadpaciente = document.querySelector("#edadpaciente");
const sangrepaciente = document.querySelector("#sangrepaciente");
const tablapaciente = document.querySelector(".tabla-paciente tbody");
const formulariopaciente = document.querySelector("#formulario-paciente");
const submit = document.querySelector(".añadir");
let edicion;


const objPaciente = {
    nombrepaciente,
    telefonopaciente,
    edadpaciente,
    sangrepaciente
}
class UI {
    validar(mensaje, tipo) {
        const checar = document.querySelector(".error");
        if (!checar) {
            const p = document.createElement("P");
            p.textContent = mensaje;
            formulariopaciente.appendChild(p);
            if (tipo == "error") {
                p.classList.add("error")
            } else {
                p.classList.add("correcto");
            }
            setTimeout(() => {
                p.remove();
            }, 2000);
        }

    }
    mostrarPacientes({ pacientes }) {
        this.limpiar();
        pacientes.forEach(pacienteInd => {
            const { id, nombrepaciente, telefonopaciente, edadpaciente, sangrepaciente } = objPaciente;
            const fila = document.createElement("TR");
            let codigo = `   <td>${Math.floor(id/100000000000)}</td>
                <td>${nombrepaciente}</td>
                <td>${telefonopaciente}</td>
                <td>${edadpaciente}</td>
                <td>${sangrepaciente}</td>`;
            fila.innerHTML = codigo;
            const columna = document.createElement("TD");
            const botonEditar = document.createElement("BUTTON");
            const botonEliminar = document.createElement("BUTTON");
            botonEditar.textContent = "Editar";
            botonEditar.className = "editar boton";
            botonEditar.onclick = () => editarPaciente(pacienteInd);
            botonEliminar.textContent = "Eliminar";
            botonEliminar.className = "eliminar boton";
            botonEliminar.onclick = () => eliminarPaciente(pacienteInd);
            columna.appendChild(botonEditar)
            columna.appendChild(botonEliminar)
            fila.appendChild(columna);
            tablapaciente.appendChild(fila);

        });

    }
    limpiar() {
        tablapaciente.innerHTML = "";
    }
}

class Paciente {
    constructor() {
        this.pacientes = [];
    }
    añadirPaciente(paciente) {
        this.pacientes = [...this.pacientes, paciente];

    }
    eliminarPaciente(paciente) {
        this.pacientes = this.pacientes.filter(pacientes => pacientes.id !== paciente.id);
    }
    editarPaciente(paciente) {
        this.pacientes = this.pacientes.map(pacientes => pacientes.id == paciente.id ? paciente : pacientes);
    }
}
// Instancias
const ui = new UI();
const paciente = new Paciente();

// Listeners
nombrepaciente.addEventListener("input", añadirPaciente);
telefonopaciente.addEventListener("input", añadirPaciente);
edadpaciente.addEventListener("input", añadirPaciente);
sangrepaciente.addEventListener("input", añadirPaciente);
formulariopaciente.addEventListener("submit", agregarPaciente);

function añadirPaciente(e) {
    objPaciente[e.target.name] = e.target.value;
}

function agregarPaciente(e) {
    e.preventDefault();
    const { nombrepaciente, telefonopaciente, edadpaciente, sangrepaciente } = objPaciente;
    const nombrep = nombrepaciente.value;
    const telefonop = telefonopaciente.value;
    const edadp = edadpaciente.value;
    const sangrep = sangrepaciente.value;
    if (nombrep == "" || telefonop == "" || edadp == "" || sangrep == "") {
        ui.validar("Ingresa todos los campos", "error");
    } else {
        if (edicion == true) {
            ui.validar("Cita Actualizada")
            paciente.editarPaciente({...objPaciente });
            submit.value = "Añadir";
            edicion = false;
        } else {
            ui.validar("Paciente Agregado");
            objPaciente.id = Date.now();
            paciente.añadirPaciente({...objPaciente });

        }
        ui.mostrarPacientes(paciente);
        reiniciarObjeto();
        formulariopaciente.reset();



    }

}

function reiniciarObjeto() {
    objPaciente.nombrepaciente = "";
    objPaciente.telefonopaciente = "";
    objPaciente.edadpaciente = "";
    objPaciente.sangrepaciente = "";
}

function eliminarPaciente(pacienteEliminado) {
    ui.validar("Paciente Eliminado");
    paciente.eliminarPaciente(pacienteEliminado);
    ui.mostrarPacientes(paciente);

}


function editarPaciente(pacienteEditar) {
    const { id: idp, nombrepaciente: nombrep, telefonopaciente: telefonop, edadpaciente: edadp, sangrepaciente: sangrep } = pacienteEditar;

    nombrepaciente.value = nombrep;
    telefonopaciente.value = telefonop;
    edadpaciente.value = edadp;
    sangrepaciente.value = sangrep;


    objPaciente.nombrepaciente = nombrep;
    objPaciente.telefonopaciente = telefonop;
    objPaciente.edadpaciente = edadp;
    objPaciente.sangrepaciente = sangrep;
    objPaciente.id = idp;

    submit.value = "Guardar Cambios";
    edicion = true;

}