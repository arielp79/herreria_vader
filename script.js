// Inicialización de Animaciones AOS
AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 120
});

// Variables para la Galería
let fotosGrupoActual = [];
let indiceActual = 0;

document.addEventListener('DOMContentLoaded', () => {
    const visor = document.getElementById('visor');
    const contenedores = document.querySelectorAll('.foto');

    // Configurar cada foto de la galería
    contenedores.forEach((contenedor) => {
        contenedor.addEventListener('click', () => {
            const imgPrincipal = contenedor.querySelector('.foto-galeria');
            const nombreGrupo = imgPrincipal.getAttribute('data-grupo');
            
            // Cargar todas las fotos que pertenecen al mismo grupo
            fotosGrupoActual = Array.from(document.querySelectorAll(`.foto-galeria[data-grupo="${nombreGrupo}"]`));
            indiceActual = 0; 
            
            mostrarFoto();
            visor.style.display = 'flex';
        });
    });
});

// Función para mostrar la foto en el visor
function mostrarFoto() {
    const imgAmpliada = document.getElementById('img-ampliada');
    if (fotosGrupoActual.length > 0) {
        imgAmpliada.src = fotosGrupoActual[indiceActual].src;
    }
}

// Cambiar fotos con las flechas
function cambiarFoto(direccion, evento) {
    if (evento) evento.stopPropagation(); // Evita que se cierre el visor al tocar la flecha
    indiceActual += direccion;

    if (indiceActual >= fotosGrupoActual.length) indiceActual = 0;
    if (indiceActual < 0) indiceActual = fotosGrupoActual.length - 1;
    
    mostrarFoto();
}

// Cerrar el visor
function cerrarVisor() {
    document.getElementById('visor').style.display = 'none';
}

// Cerrar con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") cerrarVisor();
});

async function enviarPedido() {
    const datos = {
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('whatsapp').value,
        tipo: document.getElementById('tipoTrabajo').value,
        descripcion: document.getElementById('descripcion').value,
        instalacion: document.getElementById('checkInstalacion').checked ? "SÍ" : "NO"
    };

    try {
        const response = await fetch('http://localhost:3000/nuevo-pedido', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        const texto = await response.text();
        alert(texto);
    } catch (error) {
        alert("Hubo un error al conectar con el servidor.");
    }
}

document.getElementById('miFormulario').addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('email').value,
        mensaje: document.getElementById('mensaje').value
    };

    try {
        const respuesta = await fetch('http://localhost:3000/guardar-consulta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (respuesta.ok) {
            alert("¡Consulta guardada con éxito!");
            document.getElementById('miFormulario').reset();
        } else {
            alert("Error al enviar al servidor.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo conectar con el servidor. ¿Está encendido?");
    }
});

document.getElementById('miFormulario').addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('email').value,
        mensaje: document.getElementById('mensaje').value
    };

    try {
        const respuesta = await fetch('http://localhost:3000/guardar-consulta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (respuesta.ok) {
            alert("¡Consulta guardada con éxito!");
            document.getElementById('miFormulario').reset();
        } else {
            alert("Error al enviar al servidor.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo conectar con el servidor. ¿Está encendido?");
    }
});