/* logeo */
let usuariosRegistrados = []
let usuarioLogueado = {}
const usuarioLog = document.getElementById("usuarioLog")
const contraseñaLog = document.getElementById("contraseñaLog")
const botonLog = document.querySelector("#Ingresar")
const nuevoUsuario = document.getElementById("nuevoUsuario")




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
    await Swal.fire('Bienvenido ' +usuarioLogueado.nombre)
    setTimeout(() => location.replace('http://127.0.0.1:5500/index.html', 50000))
        }
    }


/* FIN DE LOGEO */
