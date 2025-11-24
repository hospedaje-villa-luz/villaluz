let cupones = JSON.parse(localStorage.getItem("cupones")) || [
  {
    "titulo": "Opción 1",
    "descripcion": "1 Habitación 🛏️\n1 Baño 🚽🚿\nCocina 🍽️\nParqueadero 🚗🏍️",
    "precio": 132000,
    "activo": true,
    "usados": 0
  },
  {
    "titulo": "Opción 2",
    "descripcion": "2 Habitaciones 🛏️\n1 Baño 🚽🚿\nCocina 🍽️\nParqueadero 🚗🏍️",
    "precio": 264000,
    "activo": true,
    "usados": 0
  },
  {
    "titulo": "Opción 3",
    "descripcion": "1 Habitación 🛏️\nCocina 🍽️\nParqueadero 🚗🏍️",
    "precio": 110000,
    "activo": true,
    "usados": 0
  },
  {
    "titulo": "Opción 4",
    "descripcion": "3 Habitaciones 🛏️\n2 Baños 🚽🚿\nCocina 🍽️\nParqueadero 🚗🏍️",
    "precio": 374000,
    "activo": true,
    "usados": 0
  }
];

let indexEdit = -1;

function guardar() {
    localStorage.setItem("cupones", JSON.stringify(cupones));
}

function cargarCupones() {
    let contenedor = document.getElementById("listaCupones");
    contenedor.innerHTML = "";

    cupones.forEach((c, i) => {
        contenedor.innerHTML += `
            <div class="cupon-card">
                <h3>${c.titulo}</h3>
                <p class="descripcion">${c.descripcion.replace(/\n/g, "<br>")}</p>
                <p class="precio">$${c.precio.toLocaleString()}</p>

                <div class="acciones">
                    
                    <label class="switch">
                        <input type="checkbox" ${c.activo ? "checked" : ""} onchange="toggleCupon(${i})">
                        <span class="slider"></span>
                    </label>

                    <button class="btn-editar" onclick="editar(${i})">Editar</button>
                </div>

                <small>Usos: ${c.usados}</small>
            </div>
        `;
    });
}

function toggleCupon(i) {
    cupones[i].activo = !cupones[i].activo;
    guardar();
    cargarCupones();
}

function editar(i) {
    indexEdit = i;
    document.getElementById("editTitulo").value = cupones[i].titulo;
    document.getElementById("editDescripcion").value = cupones[i].descripcion;
    document.getElementById("editPrecio").value = cupones[i].precio;

    document.getElementById("modalEditar").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modalEditar").style.display = "none";
}

function guardarEdicion() {
    cupones[indexEdit].titulo = document.getElementById("editTitulo").value;
    cupones[indexEdit].descripcion = document.getElementById("editDescripcion").value;
    cupones[indexEdit].precio = parseInt(document.getElementById("editPrecio").value, 10); 

    guardar();
    cargarCupones();
    cerrarModal();
}

cargarCupones();

function descargarJSON() {
    const data = JSON.stringify(cupones, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "cupones.json";
    a.click();

    URL.revokeObjectURL(url);
}
