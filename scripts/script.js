let evento = null;
let usu_admin= "0";

function fInicio(){
    fMostrar("form_login");
}


function fMostrar(formulario){
    // Ocultar todos los formularios
    let todos = document.querySelectorAll("#div_modal > form");
    console.log("Todos", todos);
    for(i=0; i<todos.length; i++){
        todos[i].style.display = "none";
    }
    // Mostrar el formulario que me piden
    document.querySelector("#" + formulario).style.display = 'block';
    // Mostrar la modal
    document.querySelector("#div_modal").style.display = "flex";
}


function fCancelar(){
    document.querySelector("#div_modal").style.display = "none";
}

function fMostrarLogin(){
    // Mostrar el formulario
    document.querySelector("#div_modal").style.display = "flex";
}

function fCancelar(){
    document.querySelector("#div_modal").style.display = "none";
}

function fControlLogin(){
    // Leer el alias
    let alias = document.querySelector("#alias").value;
    // Leer el password
    let password = document.querySelector("#password").value;
    // Buscar el alias y el password en la BBDD
    let URL = 'assets/php/servidor.php?peticion=ControlLogin';
    URL += "&alias=" + alias;
    URL += "&password=" + password;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Si es correcto
            if (data.datos.length > 0){
            //      cerrar la modal
                document.querySelector("#div_modal").style.display = "none";
                //document.querySelector("#div_login").innerHTML = "Hola, " + data.datos[0].usu_alias;
                let foto = data.datos[0].usu_foto;
                let ruta = "assets/iconos/";
                document.querySelector("#div_foto>img").src = ruta + foto;
                document.querySelector("#div_foto>img").title = data.datos[0].usu_alias;
                usuario = data.datos[0]
                usu_admin = usuario.usu_admin
                console.log(usu_admin)
            } else {
                // si no
                //      mensaje de error
                document.querySelector("#div_error").innerHTML = "Acceso denegado";
            }      
        })
    .finally(()=>{
        fObtenerMenu()
    })
}

function fControlRegistrar(){
    // Leer el email
    let nombre = document.querySelector("#rnombre").value;
    // Leer el alias
    let alias = document.querySelector("#ralias").value;
    // Leer el password
    let password = document.querySelector("#rpassword").value;
    let password2 = document.querySelector("#rrpassword").value;
    // Comprobar los password
    if (password != password2){
        document.querySelector("#rdiv_error").innerHTML = "Los password no coinciden";
        return;
    }
    // Buscar el alias y el password en la BBDD
    let URL = 'assets/php/servidor.php?peticion=ControlRegistro';
    URL += "&alias=" + alias;
    URL += "&nombre=" + password;
    URL += "&password=" + password;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("REGISTRO",data);  
            if (data.datos == 0){
                document.querySelector("#rdiv_error").innerHTML = "Inténtelo mas tarde";
                return;
            }
            // Mostrar un mensaje
            document.querySelector("#mensaje").innerHTML = "Registro correcto";
            fMostrar("form_mensaje"); 
            // Pasado x tiempo, mostrar el formulario de login
            evento = setTimeout(fCerrarEvento,2000);

              
        })
}

function fCerrarEvento(){
    fMostrar("form_login"); 
}