/* logeo */
let usuariosRegistrados = []
let usuarioLogueado = {}
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


window.addEventListener('DOMContentLoaded', ()=> {verSiHayCosas()})



const inyector = async ()=>{   
    /* con esta funcion hace la inyeccion de los nodos de html */
    titulo2.innerHTML=""
    console.log(usuarioLogueado.nombre)
    localStorage.setItem("usuarioActual",JSON.stringify(usuarioLogueado) )
    logueo.innerHTML = ""
    await Swal.fire('Bienvenido ' +usuarioLogueado.nombre)
    const titulo = document.getElementById("titulo")
    titulo.innerHTML=`Bienvenido a Cashy Cash ${usuarioLogueado.nombre}<br>Elija la opcion que desea realizar`
    contenedor.innerHTML=`<div id="botones">
    <button id="Consultar">Consultar Saldo</button><br>
    <button id="Transferir">Transferir</button><br>
    <button id="Movimientos">Resumen de Movimientos</button><br>
    <button id="Depositar">Depositar</button><br>
    <button id="Token">Token</button><br>
    <button id="Salir"><a href="index.html">salir</a></button></div>
    <div id="EscribirSaldo"></div>
    <div id="hacerAcciones"></div>
    <div id="EscribirMovimientos"></div>`
    
    const usuarioOn = JSON.parse(localStorage.getItem("usuarioActual"))
    agregadora()
    
}



const agregadora = ()=>{
    /* esta funcion se utiliza para agregar eventos al DOM  que se agrega por JavaScript*/
let saldoActual = parseInt(Math.random()*50124)

const saldoCuenta = saldoActual
const botonConsultar = document.getElementById("Consultar")
const botonTransferir = document.getElementById("Transferir")
const botonMovimientos = document.getElementById("Movimientos")
const botonDepositar = document.getElementById("Depositar")
const botonToken = document.getElementById("Token")

const EscribirSaldo = document.getElementById("EscribirSaldo")
const EscribirMovimientos = document.getElementById("EscribirMovimientos")
const hacerAcciones = document.getElementById("hacerAcciones")


let arrayMov = []

class Movimientos{
        constructor (monto,cbu,tipo,comprobante) {
    this.monto = monto,
    this.cbu = cbu,
    this.tipo = tipo,
    this.comprobante = comprobante
    }
}   


/* consultar saldo */

botonConsultar.addEventListener("click", ()=>{
    EscribirSaldo.innerHTML = `<p>Su saldo es<br> <b>$ ${saldoActual}</b></p>`
    setTimeout(()=> EscribirSaldo.innerHTML = "", 5000)
   
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


/* Transferencias */
botonTransferir.addEventListener("click", ()=>{
    hacerAcciones.innerHTML = `<span>Ingrese el monto</span><input id="MontoTransferir"></input><br>Ingrese el CBU
    <input id="CBUenviar"></input><br><button id="aceptar">Aceptar</button><button id="cancelar">Cancelar</button>`
    const aceptar = document.getElementById("aceptar")
    const cancelar = document.getElementById("cancelar")
    const MontoTransferir = document.getElementById("MontoTransferir")
    const CBUenviar = document.getElementById("CBUenviar")

    
    aceptar.addEventListener("click",()=>{
        if(parseInt(MontoTransferir.value)<= saldoActual){
        Transferencias(MontoTransferir, CBUenviar)
        Swal.fire("Transferencia realizada con exito")
        hacerAcciones.innerHTML=""
    }else {Swal.fire("Ingreso un monto a transferir superior a su saldo actual")}

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
        const verSiHayCosas = async (parametro,parametro2)=> {
            /* esta funcion evalua el usuario que se esta registrando  y rescata la informacion de la base de datos*/
            usuarioLogueado = usuariosRegistrados.find(user => user.usuario === parametro && user.contraseña === parametro2)
            if(usuarioLogueado === undefined ){
                Swal.fire('Usuario no registrado o clave mal ingresada')
            }else{ inyector()}
        }


/* FIN DE LOGEO */



