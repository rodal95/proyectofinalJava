/* logeo */
let usuariosRegistrados = []
let usuarioLogueado = {}
const usuarioLog = document.getElementById("usuarioLog")
const contraseñaLog = document.getElementById("contraseñaLog")
const botonLog = document.querySelector("#Ingresar")
const nuevoUsuario = document.getElementById("nuevoUsuario")
const logueo = document.getElementById("logueo")
const contenedor = document.getElementById("")


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


const verSiHayCosas = async (parametro,parametro2)=> {
    usuarioLogueado = usuariosRegistrados.find( user => user.usuario === parametro && user.contraseña === parametro2)
    if(usuarioLogueado === undefined ){
        alert("no se encuentra")
    }else{ 
         
    console.log(usuarioLogueado.nombre)
    localStorage.setItem("usuarioActual",JSON.stringify(usuarioLogueado) )
    logueo.innerHTML = ""
    await Swal.fire('Bienvenido ' +usuarioLogueado.nombre)
    const botones = document.getElementById("botones")
    
    botones.innerHTML = `<h1 id="Titulo">Bienvenido a Cashy Cash ${usuarioLogueado.nombre}<br>Elija la opcion que desea realizar</h1>
    <button id="Consultar">Consultar Saldo</button><br>
    <button id="Transferir">Transferir</button><br>
    <button id="Movimientos">Resumen de Movimientos</button><br>
    <button id="Depositar">Depositar</button><br>
    <button id="Prestamo"">Solicitar un Prestamo</button><br>
    <button id="Token">Token</button><br>
    <button id="Salir"><a href="index.html">salir</a></button>
    <div id="EscribirSaldo">

    </div>
    <div id="EscribirMovimientos">
        
    
    </div>`
    const usuarioOn = JSON.parse(localStorage.getItem("usuarioActual"))
    
let saldoActual = parseInt(Math.random()*50124)

const saldoCuenta = saldoActual
const botonConsultar = document.getElementById("Consultar")
const botonTransferir = document.getElementById("Transferir")
const botonMovimientos = document.getElementById("Movimientos")
const botonDepositar = document.getElementById("Depositar")
const botonToken = document.getElementById("Token")
const titulo = document.getElementById("Titulo")
const EscribirSaldo = document.getElementById("EscribirSaldo")
const EscribirMovimientos = document.getElementById("EscribirMovimientos")



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
    EscribirSaldo.innerHTML = `<p> Saldo $ ${saldoActual}</p>`
    setTimeout(()=> EscribirSaldo.innerHTML = "", 5000)
   
})


/* fin de consultar saldo */

/* Depositos */

botonDepositar.addEventListener("click", ()=> {
    EscribirMovimientos.innerHTML= `Ingrese el monto a depositar<input id="MontoDepositar"></input><br>
    <button id="aceptar">Aceptar</button><button id="cancelar">Cancelar</button>`
    const MontoDepositar = document.getElementById("MontoDepositar")
    const aceptar = document.getElementById("aceptar")
    const cancelar = document.getElementById("cancelar")
    const tipo = "Deposito"
    const cbu = "Cuenta Propia"
    const comprobante = parseInt(Math.random()*156584782)
    
    aceptar.addEventListener("click",()=>{
        saldoActual += parseInt(MontoDepositar.value)
        EscribirMovimientos.innerHTML = ""
        let informacionDeposito = new Movimientos(MontoDepositar.value, cbu, tipo,comprobante)
        Swal.fire("Deposito realizado con exito")
        arrayMov.push(informacionDeposito)
        return saldoActual, arrayMov
    })
    cancelar.addEventListener("click", ()=>{
        EscribirMovimientos.innerHTML = ""
    })
    
})

/* Fin de depositar */

/* Transferencias */

botonTransferir.addEventListener("click", ()=>{
    EscribirMovimientos.innerHTML = `Ingrese el monto<input id="MontoTransferir"></input><br>Ingrese el CBU
    <input id="CBUenviar"></input><br><button id="aceptar">Aceptar</button><button id="cancelar">Cancelar</button>`
    const aceptar = document.getElementById("aceptar")
    const cancelar = document.getElementById("cancelar")
    const MontoTransferir = document.getElementById("MontoTransferir")
    const CBUenviar = document.getElementById("CBUenviar")

    
    aceptar.addEventListener("click",()=>{
        if(parseInt(MontoTransferir.value)<= saldoActual){
        Transferencias(MontoTransferir, CBUenviar)
        Swal.fire("Transferencia realizada con exito")
        EscribirMovimientos.innerHTML=""
    }else {Swal.fire("Ingreso un monto a transferir superior a su saldo actual")}

    })
    cancelar.addEventListener("click", ()=> {
        EscribirMovimientos.innerHTML = ""
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
/* fin de transferencias */

/* Impresion de movimientos en pantalla */
botonMovimientos.addEventListener("click", ()=> {
    EscribirMovimientos.innerHTML = ""
    if(arrayMov[0]=== undefined)Swal.fire("No se realizo ningun Movimiento en el dia de hoy")
    else{
    arrayMov.forEach(element => {
        EscribirMovimientos.innerHTML += `El monto de $<b>${element.monto}</b> enviado al cbu <b>${element.cbu}</b> el tipo de movimiento fue<b> ${element.tipo}</b> Comprobante Nº<b> ${element.comprobante}</b> <br>` 
    })
}
})



/* Fin de impresion */



    
        }
    }


/* FIN DE LOGEO */



