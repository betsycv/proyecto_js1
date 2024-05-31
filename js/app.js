//let totalIngresos = 5000;
//let totalEgresos = 2000;

const ingresos = [
    new Ingresos("Sueldo", 10000),
    new Ingresos ("Venta comic", 500)
];

const egresos = [
    new Egresos ("Renta casa", 5000 ),
    new Egresos ("Lavanderia", 250)
];

//cargar app

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    //cargarEgresos();
}


//function cargarApp() {
  //  console.log('La aplicación se ha cargado correctamente.');}

const totalIngresos = () => {
    let totalIngresos = 0;
    for(let ingreso of ingresos){
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
}

//revisar que este bien
const totalEgresos = () => {
    let totalEgresos = 0;
    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}


const cargarCabecero = () =>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje (porcentajeEgreso);
    document.getElementById('ingreso').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egreso').innerHTML = formatoMoneda(totalEgresos());

  //  console.log("Mi presupuesto es de: " + presupuesto)
  //  console.log("El porcentaje gastado es: " + porcentaje)
}

//cargarCabecero();

const formatoMoneda = (valor) => {
    return valor.toLocaleString("es-MX" , {style: "currency" , currency: "MXN" , minimumFractionDigits: 2} );
}


const formatoPorcentaje = (valor) => {
    return valor.toLocaleString ("es-MX" , {style: "percent" , minimumFractionDigits: 2});
}


const cargarIngresos = () => {
    let ingresosHtml = '';
    for (let ingreso of ingresos){
        ingresosHtml += crearIngresosHtml(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHtml;
}

const crearIngresosHtml = (ingreso) => {
    let ingresosTemplate = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                            </button>
                        </div>
        </div>
    </div>
    `
    return ingresosTemplate;

}

const eliminarIngreso = (id) => {
    let ingresoEliminar = ingresos.findIndex (ingresos => ingresos.id === id);
    ingresos.splice(ingresoEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const agregarDato = () => {
    let formulario = document.forms["forma"];
    let tipo = formulario ["tipo"];
    let descripcion = formulario ["descripcion"];
    let valor = formulario ["valor"];
    if (descripcion.value !== "" && valor.value !== ""){
        if (tipo.value === "ingreso"){
            ingresos.push (new Ingresos(descripcion.value, +valor.value)); //ingresos en mayuscula la primera?
            cargarCabecero();
            cargarIngresos();
        } else if (tipo.value === "egreso"){
            let nuevoEgreso = new  Egresos(descripcion.value, +valor.value);
            egresos.push(nuevoEgreso);
            cargarCabecero();
            cargarEgresos();
        }

    } else {
        alert("Favor de llenar los coampos de descripcion y valor");
    }
}




const cargarEgresos = () => {
    let egresosHtml = '';
    for (let egreso of egresos){
        egresosHtml += crearEgresosHtml(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHtml;
}

const crearEgresosHtml = (egreso) => {
    let egresosTemplate = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalIngresos() )}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                            </button>
                        </div>
        </div>
    </div>
    `
    return egresosTemplate;

}

const eliminarEgreso = (id) => {
    let egresoEliminar = egresos.findIndex (egresos => egresos.id === id);
    egresos.splice(egresoEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}