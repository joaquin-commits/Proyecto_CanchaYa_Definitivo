// Validaciones simples de formularios para la Evaluación Parcial 1.

function mostrarError(id, mensaje) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.textContent = mensaje;
    }
}

function limpiarErrores(formulario) {
    formulario.querySelectorAll(".error").forEach(function (elemento) {
        elemento.textContent = "";
    });
}

function correoValido(correo) {
    const expresion = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return expresion.test(correo);
}

function textoValido(texto, minimo, maximo) {
    return texto.length >= minimo && texto.length <= maximo;
}

// LOGIN
const formLogin = document.getElementById("formLogin");
if (formLogin) {
    formLogin.addEventListener("submit", function (evento) {
        evento.preventDefault();
        limpiarErrores(formLogin);

        const correo = document.getElementById("correo").value.trim().toLowerCase();
        const clave = document.getElementById("clave").value.trim();
        let valido = true;

        if (correo === "") {
            mostrarError("errorCorreo", "El correo es obligatorio.");
            valido = false;
        } else if (correo.length > 100) {
            mostrarError("errorCorreo", "El correo no puede superar 100 caracteres.");
            valido = false;
        } else if (!correoValido(correo)) {
            mostrarError("errorCorreo", "El correo electrónico no tiene un formato válido.");
            valido = false;
        }

        if (clave === "") {
            mostrarError("errorClave", "La contraseña es obligatoria.");
            valido = false;
        } else if (clave.length < 4 || clave.length > 10) {
            mostrarError("errorClave", "La contraseña debe contener entre 4 y 10 caracteres.");
            valido = false;
        }

        if (!valido) {
            return;
        }

        if (correo === "cliente1@canchas.cl" && clave === "1234") {
            window.location.href = "cliente.html";
        } else if ((correo === "dueno1@canchas.cl" || correo === "dueno2@canchas.cl") && clave === "1234") {
            window.location.href = "dueno.html";
        } else if (correo === "admin@canchas.cl" && clave === "admin123") {
            window.location.href = "admin.html";
        } else {
            mostrarError("errorLogin", "Los datos no corresponden a una cuenta de demostración.");
        }
    });

    document.getElementById("correo").addEventListener("blur", function () {
        const correo = this.value.trim();
        if (correo !== "" && !correoValido(correo)) {
            mostrarError("errorCorreo", "Sugerencia: use un correo como nombre@dominio.cl.");
        } else {
            mostrarError("errorCorreo", "");
        }
    });
}

// REGISTRO
const formRegistro = document.getElementById("formRegistro");
if (formRegistro) {
    formRegistro.addEventListener("submit", function (evento) {
        evento.preventDefault();
        limpiarErrores(formRegistro);

        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const clave = document.getElementById("clave").value;
        const repetirClave = document.getElementById("repetirClave").value;
        const tipo = document.getElementById("tipo").value;
        let valido = true;

        if (!textoValido(nombre, 2, 50)) {
            mostrarError("errorNombre", "Ingrese un nombre entre 2 y 50 caracteres.");
            valido = false;
        }

        if (!textoValido(apellido, 2, 50)) {
            mostrarError("errorApellido", "Ingrese un apellido entre 2 y 50 caracteres.");
            valido = false;
        }

        if (correo === "") {
            mostrarError("errorCorreo", "El correo es obligatorio.");
            valido = false;
        } else if (correo.length > 100 || !correoValido(correo)) {
            mostrarError("errorCorreo", "Ingrese un correo válido de máximo 100 caracteres.");
            valido = false;
        }

        if (clave.length < 4 || clave.length > 10) {
            mostrarError("errorClave", "La contraseña debe contener entre 4 y 10 caracteres.");
            valido = false;
        }

        if (repetirClave === "") {
            mostrarError("errorRepetirClave", "Repita la contraseña.");
            valido = false;
        } else if (clave !== repetirClave) {
            mostrarError("errorRepetirClave", "Las contraseñas no coinciden.");
            valido = false;
        }

        if (tipo === "") {
            mostrarError("errorTipo", "Seleccione un tipo de perfil.");
            valido = false;
        }

        if (valido) {
            document.getElementById("mensajeRegistro").textContent = "Formulario válido. Registro simulado correctamente.";
            formRegistro.reset();
        }
    });

    document.getElementById("repetirClave").addEventListener("input", function () {
        const clave = document.getElementById("clave").value;
        if (this.value !== "" && this.value !== clave) {
            mostrarError("errorRepetirClave", "Las contraseñas todavía no coinciden.");
        } else {
            mostrarError("errorRepetirClave", "");
        }
    });
}

// CONTACTO
const formContacto = document.getElementById("formContacto");
if (formContacto) {
    formContacto.addEventListener("submit", function (evento) {
        evento.preventDefault();
        limpiarErrores(formContacto);

        const nombre = document.getElementById("nombreContacto").value.trim();
        const correo = document.getElementById("correoContacto").value.trim();
        const motivo = document.getElementById("motivoContacto").value;
        const mensaje = document.getElementById("mensajeContacto").value.trim();
        let valido = true;

        if (nombre === "" || nombre.length > 100) {
            mostrarError("errorNombreContacto", "Ingrese su nombre, con un máximo de 100 caracteres.");
            valido = false;
        }

        if (correo === "" || correo.length > 100 || !correoValido(correo)) {
            mostrarError("errorCorreoContacto", "Ingrese un correo electrónico válido.");
            valido = false;
        }

        if (motivo === "") {
            mostrarError("errorMotivoContacto", "Seleccione el motivo del mensaje.");
            valido = false;
        }

        if (mensaje === "") {
            mostrarError("errorMensajeContacto", "Escriba un mensaje antes de enviar.");
            valido = false;
        } else if (mensaje.length > 500) {
            mostrarError("errorMensajeContacto", "El mensaje no puede superar 500 caracteres.");
            valido = false;
        }

        if (valido) {
            document.getElementById("mensajeContactoOk").textContent = "Mensaje validado y enviado de manera demostrativa.";
            formContacto.reset();
        }
    });
}

// RESERVA Y PAGO SIMULADO
const formReserva = document.getElementById("formReserva");
if (formReserva) {
    formReserva.addEventListener("submit", function (evento) {
        evento.preventDefault();
        limpiarErrores(formReserva);

        const cancha = document.getElementById("cancha").value;
        const fecha = document.getElementById("fecha").value;
        const horario = document.getElementById("horario").value;
        const pago = document.getElementById("metodoPago").value;
        let valido = true;

        if (cancha === "") {
            mostrarError("errorCancha", "Seleccione una cancha.");
            valido = false;
        }

        if (fecha === "") {
            mostrarError("errorFecha", "Seleccione una fecha para la reserva.");
            valido = false;
        } else {
            const fechaSeleccionada = new Date(fecha + "T00:00:00");
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            if (fechaSeleccionada < hoy) {
                mostrarError("errorFecha", "La fecha de reserva no puede estar en el pasado.");
                valido = false;
            }
        }

        if (horario === "") {
            mostrarError("errorHorario", "Seleccione un horario disponible.");
            valido = false;
        }

        if (pago === "") {
            mostrarError("errorMetodoPago", "Seleccione un método para el pago simulado.");
            valido = false;
        }

        if (valido) {
            document.getElementById("mensajeReserva").textContent = "Pago simulado aprobado. La reserva quedó confirmada.";
            formReserva.reset();
        }
    });
}

// MODIFICAR CANCHA DEL DUEÑO
const formEditarCancha = document.getElementById("formEditarCancha");
if (formEditarCancha) {
    formEditarCancha.addEventListener("submit", function (evento) {
        evento.preventDefault();
        limpiarErrores(formEditarCancha);

        const cancha = document.getElementById("canchaDueno").value;
        const horarios = document.getElementById("horariosDueno").value.trim();
        const disponibilidad = document.getElementById("disponibilidadDueno").value;
        let valido = true;

        if (cancha === "") {
            mostrarError("errorCanchaDueno", "Seleccione una de sus canchas.");
            valido = false;
        }

        if (horarios === "") {
            mostrarError("errorHorariosDueno", "Ingrese al menos un horario.");
            valido = false;
        } else if (horarios.length > 100) {
            mostrarError("errorHorariosDueno", "Los horarios no pueden superar 100 caracteres.");
            valido = false;
        }

        if (disponibilidad === "") {
            mostrarError("errorDisponibilidadDueno", "Seleccione la disponibilidad.");
            valido = false;
        }

        if (valido) {
            document.getElementById("mensajeCanchaDueno").textContent = "Datos válidos. Cambios guardados de manera demostrativa.";
        }
    });
}

// CANCELACIÓN DE RESERVAS
const formCancelarReserva = document.getElementById("formCancelarReserva");
if (formCancelarReserva) {
    formCancelarReserva.addEventListener("submit", function (evento) {
        evento.preventDefault();
        limpiarErrores(formCancelarReserva);

        const reserva = document.getElementById("reservaCancelar").value;
        const motivo = document.getElementById("motivoCancelacion").value.trim();
        let valido = true;

        if (reserva === "") {
            mostrarError("errorReservaCancelar", "Seleccione una reserva.");
            valido = false;
        }

        if (motivo === "") {
            mostrarError("errorMotivoCancelacion", "Indique brevemente el motivo de la cancelación.");
            valido = false;
        } else if (motivo.length > 200) {
            mostrarError("errorMotivoCancelacion", "El motivo no puede superar 200 caracteres.");
            valido = false;
        }

        if (valido) {
            document.getElementById("mensajeCancelacion").textContent = "Solicitud de cancelación validada de manera demostrativa.";
            formCancelarReserva.reset();
        }
    });
}

// CREAR CANCHA - ADMINISTRADOR
const formNuevaCancha = document.getElementById("formNuevaCancha");
if (formNuevaCancha) {
    formNuevaCancha.addEventListener("submit", function (evento) {
        evento.preventDefault();
        limpiarErrores(formNuevaCancha);

        const dueno = document.getElementById("nuevoDueno").value;
        const nombre = document.getElementById("nuevoNombreCancha").value.trim();
        const tipo = document.getElementById("nuevoTipoCancha").value;
        const ubicacion = document.getElementById("nuevaUbicacionCancha").value.trim();
        const valor = document.getElementById("nuevoValorCancha").value;
        const horarios = document.getElementById("nuevosHorariosCancha").value.trim();
        let valido = true;

        if (dueno === "") {
            mostrarError("errorNuevoDueno", "Seleccione el dueño responsable de la cancha.");
            valido = false;
        }
        if (!textoValido(nombre, 3, 80)) {
            mostrarError("errorNuevoNombre", "El nombre debe tener entre 3 y 80 caracteres.");
            valido = false;
        }
        if (tipo === "") {
            mostrarError("errorNuevoTipo", "Seleccione el tipo de cancha.");
            valido = false;
        }
        if (!textoValido(ubicacion, 3, 100)) {
            mostrarError("errorNuevaUbicacion", "Ingrese una ubicación entre 3 y 100 caracteres.");
            valido = false;
        }
        if (valor === "" || Number(valor) <= 0) {
            mostrarError("errorNuevoValor", "Ingrese un valor mayor que 0.");
            valido = false;
        }
        if (horarios === "") {
            mostrarError("errorNuevosHorarios", "Ingrese los horarios separados por coma.");
            valido = false;
        }

        if (valido) {
            document.getElementById("mensajeNuevaCancha").textContent = "Cancha validada y creada de manera demostrativa.";
            formNuevaCancha.reset();
        }
    });
}

// ELIMINAR CANCHA - ADMINISTRADOR
const formEliminarCancha = document.getElementById("formEliminarCancha");
if (formEliminarCancha) {
    formEliminarCancha.addEventListener("submit", function (evento) {
        evento.preventDefault();
        limpiarErrores(formEliminarCancha);

        const cancha = document.getElementById("canchaEliminar").value;
        if (cancha === "") {
            mostrarError("errorCanchaEliminar", "Seleccione la cancha que desea eliminar.");
            return;
        }

        document.getElementById("mensajeEliminarCancha").textContent = "Selección válida. Eliminación simulada correctamente.";
        formEliminarCancha.reset();
    });
}

function validarFormularioUsuario(formulario, prefijo) {
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        limpiarErrores(formulario);

        const nombre = document.getElementById("nombre" + prefijo).value.trim();
        const correo = document.getElementById("correo" + prefijo).value.trim();
        const clave = document.getElementById("clave" + prefijo).value;
        let valido = true;

        if (!textoValido(nombre, 2, 50)) {
            mostrarError("errorNombre" + prefijo, "Ingrese un nombre entre 2 y 50 caracteres.");
            valido = false;
        }

        if (correo === "" || correo.length > 100 || !correoValido(correo)) {
            mostrarError("errorCorreo" + prefijo, "Ingrese un correo electrónico válido.");
            valido = false;
        }

        if (clave.length < 4 || clave.length > 10) {
            mostrarError("errorClave" + prefijo, "La contraseña debe contener entre 4 y 10 caracteres.");
            valido = false;
        }

        if (valido) {
            document.getElementById("mensaje" + prefijo).textContent = "Datos válidos. Registro creado de manera demostrativa.";
            formulario.reset();
        }
    });
}

const formNuevoDueno = document.getElementById("formNuevoDueno");
if (formNuevoDueno) {
    validarFormularioUsuario(formNuevoDueno, "NuevoDueno");
}

const formNuevoCliente = document.getElementById("formNuevoCliente");
if (formNuevoCliente) {
    validarFormularioUsuario(formNuevoCliente, "NuevoCliente");
}
