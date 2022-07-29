/* logeo */
let usuariosRegistrados = []
const usuarioLog = document.getElementById("usuarioLog")
const contraseñaLog = document.getElementById("contraseñaLog")
const botonLog = document.querySelector("#Ingresar")
const nuevoUsuario = document.getElementById("nuevoUsuario")
const logueo = document.getElementById("logueo")
const contenedor = document.getElementById("contenedor")
const titulo2 = document.getElementById("titulo2")
titulo2.innerHTML=`Bienvenido a cashy cash`
botonLog.addEventListener('click', () => {
    fetch("base.json")
    .then(response => response.json())
    .then(elemento => {
        usuariosRegistrados=elemento
        console.log(usuariosRegistrados)
        verSiHayCosas(usuarioLog.value,contraseñaLog.value)

        
        })
    .catch(err => console.log(err))
})



const saveActualizacion = ()=>{
    if(window.localStorage.getItem('usuarioActual')){
        usuarioLogueado = JSON.parse(window.localStorage.getItem('usuarioActual'))
        inyector()
        setTimeout(() => {window.localStorage.removeItem('usuarioActual')
        }, 35000);
    }else{
        return
    }
}

window.addEventListener('DOMContentLoaded', saveActualizacion)

const inyector =  ()=>{   
    /* con esta funcion hace la inyeccion de los nodos de html */
    titulo2.innerHTML=""
    localStorage.setItem("usuarioActual",JSON.stringify(usuarioLogueado) )
    logueo.innerHTML = ""

    
    const titulo = document.getElementById("titulo")
    titulo.innerHTML=`Bienvenido a Cashy Cash ${usuarioLogueado.nombre}<br>Elija la opcion que desea realizar`
    contenedor.innerHTML=`<div id="botones">
    <button id="Consultar">Consultar Saldo</button><br>
    <button id="Transferir">Transferir</button><br>
    <button id="Movimientos">Resumen de Movimientos</button><br>
    <button id="Depositar">Depositar</button><br>
    <button id="Token">Token</button><br>
    <button id="Salir">Salir</button></div>
    <div id="escribirToken"></div>
    <div id="EscribirSaldo"></div>
    <div id="hacerAcciones"></div>
    <div id="EscribirMovimientos"></div>`
    
    agregadora()
    
}



const agregadora = ()=>{
    /* esta funcion se utiliza para agregar eventos al DOM  que se agrega por JavaScript*/
let saldoActual = parseInt(Math.random()*50124)


const botonConsultar = document.getElementById("Consultar")
const botonTransferir = document.getElementById("Transferir")
const botonMovimientos = document.getElementById("Movimientos")
const botonDepositar = document.getElementById("Depositar")
const botonToken = document.getElementById("Token")
const botonSalir = document.getElementById("Salir")

const EscribirSaldo = document.getElementById("EscribirSaldo")
const EscribirMovimientos = document.getElementById("EscribirMovimientos")
const hacerAcciones = document.getElementById("hacerAcciones")
const escribirToken = document.getElementById("escribirToken")

let arrayMov = []
let intervalo = 0
class Movimientos{
        constructor (monto,cbu,tipo,comprobante) {
    this.monto = monto,
    this.cbu = cbu,
    this.tipo = tipo,
    this.comprobante = comprobante
    }
}   
botonToken.addEventListener("click", ()=>{
    escribirToken.innerHTML = `Su Token es <br> ${parseInt(Math.random() * 1000000)}`
    setTimeout(()=> escribirToken.innerHTML="", 7000)
    
})


/* consultar saldo */

botonConsultar.addEventListener("click", ()=>{
    EscribirSaldo.innerHTML = `<p>Su saldo es<br> <b>$ ${saldoActual}</b></p>`
    setTimeout(()=> EscribirSaldo.innerHTML="", 7000)
   
})


/* fin de consultar saldo */

/* Depositos */

botonDepositar.addEventListener("click", ()=> {
    hacerAcciones.innerHTML= `Ingrese el monto a depositar<input id="MontoDepositar"></input><br>
    <button id="aceptar">Aceptar</button><button id="cancelar">Cancelar</button>`
    const MontoDepositar = document.getElementById("MontoDepositar")
    const aceptar = document.getElementById("aceptar")
    const cancelar = document.getElementById("cancelar")
    const tipo = "Deposito"
    const cbu = "Cuenta Propia"
    const comprobante = parseInt(Math.random()*156584782)
    
    aceptar.addEventListener("click",()=>{
        saldoActual += parseInt(MontoDepositar.value)
        hacerAcciones.innerHTML = ""
        let informacionDeposito = new Movimientos(MontoDepositar.value, cbu, tipo,comprobante)
        Swal.fire("Deposito realizado con exito")
        arrayMov.push(informacionDeposito)
        return saldoActual, arrayMov
    })
    cancelar.addEventListener("click", ()=>{
        hacerAcciones.innerHTML = ""
    })
    
})

/* Fin de depositar */


/**Boton salir */
botonSalir.addEventListener("click", ()=>{
    window.localStorage.removeItem('usuarioActual')
    location.reload()
})
/* Fin de salir*/

/* Transferencias */
botonTransferir.addEventListener("click", ()=>{
    hacerAcciones.innerHTML = `<span>Ingrese el monto $$</span><input type="number" id="MontoTransferir"></input><br>Ingrese el CBU
    <input type="number" id="CBUenviar"></input><br><button id="aceptar">Aceptar</button><button id="cancelar">Cancelar</button>`
    const aceptar = document.getElementById("aceptar")
    const cancelar = document.getElementById("cancelar")
    const MontoTransferir = document.getElementById("MontoTransferir")
    const CBUenviar = document.getElementById("CBUenviar")

    aceptar.addEventListener("click",()=>{
        if(parseInt(MontoTransferir.value)<= saldoActual && CBUenviar.value != ""){
        Transferencias(MontoTransferir, CBUenviar)
        Swal.fire("Transferencia realizada con exito")
        hacerAcciones.innerHTML=""}
        else {Swal.fire("Ingreso un monto a transferir superior a su saldo actual y/o ingrese un cbu para poder enviar")
        }

    })  
        cancelar.addEventListener("click", ()=> {
        hacerAcciones.innerHTML = ""
        console.log(transferenciasRealizadas)
    })
})

function Transferencias(parametro,parametro2){
    const plataenviar = parametro.value
    const cbu = parametro2.value
    const tipo = "Transferencia"
    const comprobante = parseInt(Math.random()*156584782)
    let informacionTransferencias = new Movimientos(plataenviar,cbu,tipo,comprobante)
    saldoActual -= plataenviar
    arrayMov.push(informacionTransferencias)
    return arrayMov,saldoActual
    }
console.log(arrayMov)
/* Fin de transferencias */

/* Impresion de movimientos en pantalla */
botonMovimientos.addEventListener("click", ()=> {
    EscribirMovimientos.innerHTML = ""
    if(arrayMov[0]=== undefined)Swal.fire("No se realizo ningun Movimiento en el dia de hoy")
    else{
    arrayMov.forEach(element => {
        EscribirMovimientos.innerHTML += `<p>El monto de $<b>${element.monto}</b> enviado al cbu <b>${element.cbu}</b> el tipo de movimiento fue<b> ${element.tipo}</b> Comprobante Nº<b> ${element.comprobante}</b></p> <br>` 
         })}
    })
/* Fin de impresion */
}

/* Logueo */
        const verSiHayCosas = async (parametro,parametro2)=> {
            /* esta funcion evalua el usuario que se esta registrando  y rescata la informacion de la base de datos*/
            usuarioLogueado = usuariosRegistrados.find(user => user.usuario === parametro && user.contraseña === parametro2)
            if(usuarioLogueado === undefined ){
                Swal.fire('Usuario no registrado o clave mal ingresada')
            }else{
                await Swal.fire('Bienvenido ' +usuarioLogueado.nombre) 
                inyector()
            }
        }
/* FIN DE LOGEO */



