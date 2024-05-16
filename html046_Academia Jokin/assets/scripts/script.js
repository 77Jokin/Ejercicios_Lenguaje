//let as_cur_id = null;

function fInicio(){
    fGeneraCombo("#as_categorias", "as_pr_id");
    fGeneraCombo("#al_categorias", "al_pr_id");
}
function fMostrarForm(formulario){
   let formularios = document.querySelectorAll("#div_modal > div");
   formularios.forEach(item => {
       item.style.display = 'none';
   });
   
    document.querySelector(formulario).style.display = 'block';
        
    document.querySelector("#div_modal").style.display = 'flex';
}

function fOCultarModal(){

    document.querySelector("#div_modal").style.display = 'none';

}
function fMostrarCategorias(){
    let URL = 'assets/php/servidor.php?peticion=CargarCategorias';
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("Categorias", data);    
            let html = "<h2> ";
            html += "CATEGORIAS(";
            html +=`<span title="añadir Categorias" onclick="fPrepararFormCategorias('a',0,'')">`;
            html += `<i class="fas fa-plus" title="Añadir"></i>`;
            html += "</span> )";
            html += "</h2>";
            html += "<table border=1>";
            // Cabeceras
            html += "<tr>";
            html += "   <th>ID</th>";
            html += "   <th>CATEGORIA</th>"; 
            html += "   <th>COLOR</th>"; 
            html += "   <th>ACCIONES</th>";            
            html += "</tr>";
            // Datos
            data.datos.forEach(item => {
                html+= "<tr>";                
                html+= `    <td>${item.cat_id}</td>`;                
                html+= `    <td>${item.cat_categoria}</td>`; 
                html+= `    <td>${item.cat_color}</td>`; 
                html+= `    <td>`;
                html+= `        <div class="botonera">`;    
                html+= `            <div onclick="fPrepararFormCategorias('e', ${item.cat_id} , '${item.cat_categoria}','${item.cat_color}')">`;
                html+= `                <i class="fas fa-trash" title="Borrar ${item.cat_categoria}"></i>`;
                html+= "            </div>";                
                html+= `               <div onclick="fPrepararFormCategorias('m', ${item.cat_id} , '${item.cat_categoria}','${item.cat_color}')">`;
                html+= `                <i class="fas fa-edit" title="Modificar ${item.cat_categoria}"></i>`;                
                html+= "            </div>";             
                html+= "        </div>";
                html+= `    </td>`;
                html+= "</tr>";
            });
            html += "</table>";
            document.querySelector("section").innerHTML = html;
        })
        .finally(function () {
            
        })

        
       
}
function fPrepararFormCategorias(operacion, id , nombre){
document.querySelector("#cat_id").value = id; 
document.querySelector("#cur_error").innerHTML = "";
document.querySelector("#cat_categoria").value=nombre;

if(operacion == 'a'){
    document.querySelector("#cat_categoria").innerHTML = "";
    document.querySelector("#boton_categorias_grabar").style.display = 'block';
    document.querySelector("#boton_categorias_eliminar").style.display = 'none';
    document.querySelector("#boton_categorias_modificar").style.display = 'none';
}

if(operacion == 'e'){
    document.querySelector("#cat_categoria").innerHTML = "";
    document.querySelector("#boton_categorias_grabar").style.display = 'none';
    document.querySelector("#boton_categorias_eliminar").style.display = 'block';
    document.querySelector("#boton_categorias_modificar").style.display = 'none';
}

if(operacion == 'm'){
    document.querySelector("#cat_categoria").innerHTML = "";
    document.querySelector("#boton_categorias_grabar").style.display = 'none';
    document.querySelector("#boton_categorias_eliminar").style.display = 'none';
    document.querySelector("#boton_categorias_modificar").style.display = 'block';
}
    fMostrarForm("#div_form_categorias");
}

function fCategoriasCRUD(operacion){
let id = document.querySelector("#cat_id").value;
let nombre = document.querySelector("#cat_categoria").value;
let color = document.querySelector("#cat_color").value;
let devolucion = "";
let sql = "";

if(operacion == 'a'){
sql = `INSERT INTO categorias VALUES (null,'${nombre}')`;
sql = `INSERT INTO categorias VALUES (null,'${color}')`;
devolucion = "i";
}
if(operacion == 'e'){
    sql = `DELETE FROM categorias WHERE cat_id =${id}`;
    
    }
    if(operacion == 'm'){
        sql = `UPDATE categorias SET cat_categoria = '${nombre}' WHERE cat_id =${id}`; 
        sql = `UPDATE categorias SET cat_color = '${color}' WHERE cat_id =${id}`;
        }

        console.log(sql);

        let URL = 'assets/php/servidor.php?peticion=EjecutarCRUD';
        URL += "&sql=" + sql;
        URL += "&devolucion="  + devolucion;
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                console.log("crud categoria ", data); 
                
 


            })

            .finally( ()=>{
                fGeneraCombo("#as_categorias");
                fGeneraCombo("#al_categorias");
                fOCultarModal();
                fMostrarCategorias();
            });
}

function fMostrarPreguntas(){
    let URL = 'assets/php/servidor.php?peticion=CargarPreguntas';
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("Preguntas", data);    
            let html = "<h2>";
            html += "PREGUNTAS (";
            html +=`<span title="añadir alumnos" onclick="fPrepararFormPreguntas('a',0,'','',0)">`;
            html += `<i class="fas fa-plus" title="Añadir"></i>`;
            html += "</span> )";
            html += "</h2>"
            html += "<table border=1>";
            // Cabeceras
            html += "<tr>";
            html += "   <th>ID</th>";
            html += "   <th>PREGUNTA</th>"; 
            html += "   <th>RESPUESTA 1</th>"; 
            html += "   <th>RESPUESTA 2</th>"; 
            html += "   <th>RESPUESTA 3</th>"; 
            html += "   <th>RESPUESTA 4</th>"; 
            html += "   <th>Valida?</th>";    
            html += "   <th>BOTONERA</th>";          
            html += "</tr>";
            // Datos
            data.datos.forEach(item => {
                html+= "<tr>";      
                if (item.pr_id == null) item.pr_id = ""; 
                if (item.pr_pregunta == null) item.pr_pregunta = "";
                if (item.pr_r1 == null) item.pr_r1 = "";
                if (item.pr_r2 == null) item.pr_r2 = "";  
                if (item.pr_r3 == null) item.pr_r3 = "";  
                if (item.pr_r4 == null) item.pr_r4 = "";  
                if (item.pr_valida == null) item.pr_valida = "";                     
                html+= `    <td>${item.pr_id}</td>`;            
                html+= `    <td>${item.pr_pregunta}</td>`;
                html+= `    <td>${item.pr_r1}</td>`;
                html+= `    <td>${item.pr_r2}</td>`;
                html+= `    <td>${item.pr_r3}</td>`;
                html+= `    <td>${item.pr_r4}</td>`;
                html+= `    <td>${item.pr_valida}</td>`;
                html+= `    <td>`;
                html+= `        <div class="botonera">`;    
                html+= `            <div onclick="fPrepararFormPreguntas('e',${item.pr_id},'${item.pr_pregunta}','${item.pr_r1}','${item.pr_r2}','${item.pr_r3}','${item.pr_r4}',${item.pr_valida})">`;
                html+= `                <i class="fas fa-trash" title="Borrar"></i>`;
                html+= "            </div>";                
                html+= `            <div onclick="fPrepararFormPreguntas('m',${item.pr_id},'${item.pr_pregunta}','${item.pr_r1}','${item.pr_r2}','${item.pr_r3}','${item.pr_r4}',${item.pr_valida})">`;
                html+= `                <i class="fas fa-edit"></i>`;                
                html+= "            </div>";             
                html+= "        </div>";
                html+= `    </td>`;
                html+= "</tr>";
            });
            html += "</table>";
            document.querySelector("section").innerHTML = html;
        })
        .finally(function () {
            
        })
}

function fPrepararFormAlumnos(operacion, id , pregunta, r1 , r2, r3, r4, valida){
document.querySelector("#pr_id").value = id;
document.querySelector("#al_error").innerHTML = "";
document.querySelector("#pr_pregunta").value=pregunta;
document.querySelector("#pr_r1").value=r1;
document.querySelector("#pr_r2").value=r2;
document.querySelector("#pr_r3").value=r3;
document.querySelector("#pr_r4").value=r4;
document.querySelector("#pr_valida").value=valida;




console.log("viendo el id del as curso id",curso);

if(operacion == 'a'){
    document.querySelector("#pr_id").innerHTML = "";
    document.querySelector("#pr_preguntas").innerHTML = "";
    document.querySelector("#boton_preguntas_grabar").style.display = 'block';
    document.querySelector("#boton_preguntas_eliminar").style.display = 'none';
    document.querySelector("#boton_preguntas_modificar").style.display = 'none';
}

if(operacion == 'e'){
    document.querySelector("#pr_id").innerHTML = ""
    document.querySelector("#pr_preguntas").innerHTML = "";
    document.querySelector("#boton_preguntas_grabar").style.display = 'none';
    document.querySelector("#boton_preguntas_eliminar").style.display = 'block';
    document.querySelector("#boton_preguntas_modificar").style.display = 'none';
}

if(operacion == 'm'){
    document.querySelector("#pr_id").innerHTML = "";
    document.querySelector("#pr_preguntas").innerHTML = "";
    document.querySelector("#boton_preguntas_grabar"    ).style.display = 'none';
    document.querySelector("#boton_preguntas_eliminar"  ).style.display = 'none';
    document.querySelector("#boton_preguntas_modificar" ).style.display = 'block';
}
    fMostrarForm("#div_form_preguntas");
}

function fPreguntasCRUD(operacion){
let id = document.querySelector("#al_id").value;
let preguntas = document.querySelector("#pr_preguntas").value;
let apellido = document.querySelector("#al_apellido").value;
let al_cur_id = document.querySelector("#al_cur_id").value; 

let devolucion = "";
let sql = "";

if(operacion == 'a'){
sql = `INSERT INTO alumnos VALUES (null,'${preguntas}','${apellido}', ${al_cur_id})`;
devolucion = "i";
}
if(operacion == 'e'){
    sql = `DELETE FROM alumnos WHERE al_id=${id}`;
    
    }
    if(operacion == 'm'){
        sql = `UPDATE alumnos SET pr_preguntas = '${preguntas}' , 
                                    al_apellidos = '${apellido}',
                                       al_cur_id = ${al_cur_id} 
                                       WHERE al_id =${id} `; 
        
        }

        console.log(sql);

        let URL = 'assets/php/servidor.php?peticion=EjecutarCRUD';
        URL += "&sql=" + sql;
        URL += "&devolucion="  + devolucion;
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                console.log("crud preguntas ", data); 

            })

            .finally( ()=>{
                
                fOCultarModal();
                fMostrarPreguntas();
                fGeneraCombo("#as_categoria", "as_pr_id");
                fGeneraCombo("#al_categoria", "al_pr_id");

            });
}


function fGeneraCombo(donde , con_que_nombre){
    let URL = 'assets/php/servidor.php?peticion=CargarCategorias';
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("Categorias", data); 
            let html = `<select name='sel_categorias' id='${con_que_nombre}'>`;
            for (i=0; i<data.datos.length; i++) {
                    html += `<option value="${data.datos[i].cat_id}">${data.datos[i].cat_categoria}</option>`;
                   
            };
            html+="</select>";
            document.querySelector(donde).innerHTML = html;
            
        })
        .finally(function () {
        })
}

