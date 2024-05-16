<?php
require_once("BBDD_CTRLR.php");

if (isset($_REQUEST['peticion'])) {
    switch ($_REQUEST['peticion']) {
        case "CargarCategorias":           
            $sql = "SELECT * FROM categorias ORDER BY cat_categoria";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);  
            break; 
        case "CategoriasPorId":
            $id = $_REQUEST['cur_id'];
            $sql = "SELECT * FROM categorias WHERE cat_id = $id";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);  
            break; 
        case "CategoriasInsertar":
            $nombre = $_REQUEST['cat_categoria'];
            $sql = "INSERT INTO categorias VALUES (null, '$nombre')";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
            echo json_encode($datos);  
            break; 
        case "CategoriasModificar":
            $id = $_REQUEST['cat_id'];
            $nombre = $_REQUEST['cat_categoria'];
            $sql = "UPDATE categorias SET cat_categoria = '$nombre' WHERE cat_id = $id";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, '');
            echo json_encode($datos);  
            break;
        case "CategoriasBorrar":
            $id = $_REQUEST['cat_id'];
            $sql = "DELETE FROM categorias WHERE cat_id = $id";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, '');
            echo json_encode($datos);  
            break;



        
        case "CargarPreguntas":           
            $sql = "SELECT * FROM preguntas ORDER BY pr_pregunta";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);  
            break; 
        case "PreguntasPorId":
            $id = $_REQUEST['pr_id'];
            $sql = "SELECT * FROM preguntas WHERE pr_id = $id";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);  
            break; 
        case "PreguntasInsertar":
            $nombre = $_REQUEST['pr_pregunta'];
            $sql = "INSERT INTO preguntas VALUES (null, '$nombre')";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
            echo json_encode($datos);  
            break; 
        case "PreguntasModificar":
            $id = $_REQUEST['pr_id'];
            $nombre = $_REQUEST['pr_pregunta'];
            $sql = "UPDATE preguntas SET pr_pregunta = '$nombre' WHERE pr_id = $id";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, '');
            echo json_encode($datos);  
            break;
        case "PreguntasBorrar":
            $id = $_REQUEST['pr_id'];
            $sql = "DELETE FROM preguntas WHERE pr_id = $id";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, '');
            echo json_encode($datos);  
            break;
     
            
        case "EjecutarSQL":
            $sql = $_REQUEST['sql'];
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);  
            break;

            case "EjecutarCRUD":
                $sql = $_REQUEST['sql'];
                $devolucion = $_REQUEST['devolucion'];
                $datos['datos'] = BBDD_CTRLR::CRUD($sql,$devolucion);
                echo json_encode($datos);  
                break;
    }        
}