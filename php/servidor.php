<?php
require_once("BBDD_CTRLR.php");

if (isset($_REQUEST['peticion'])) {
    switch ($_REQUEST['peticion']) {
        case "ControlLogin":
            // Recuperar parametros
            $alias = $_REQUEST['alias'];
            $password = $_REQUEST['password'];
            // Preparo el SQL
            $sql = "SELECT * FROM usuarios WHERE usu_alias = '$alias' AND usu_password=md5('$password')";
            $datos['sql']=$sql;
            // Ejecuto el SQL guardando el resultado
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            // Devuelvo a JS los datos codificados como JSON
            echo json_encode($datos);  
            break; 
        case "ControlRegistro":
            $nombre = $_REQUEST['nombre'];
            $alias = $_REQUEST['alias'];
            $password = $_REQUEST['password'];
            $sql = "INSERT INTO usuarios VALUES ( null, '$nombre','$alias', md5('$password'), 'u05.gif','0')";
            $datos['sql']=$sql;
            // CUIDADO : Este servidor utiliza la función CRUD para hacer Insert, Update o Delete
            // CRUD tiene 2 parámetros, el SQL y una letra que si es i devuelve el ID generado; 
            //  si no es i devuelve el nº de registros procesados
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
            // Devuelvo a JS los datos codificados como JSON
            echo json_encode($datos);  
            break;
        case "EjecutarSQL":
            $sql = $_REQUEST['sql'];
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);  
            break;
    }
}   