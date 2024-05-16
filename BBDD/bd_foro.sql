-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-05-2024 a las 11:39:58
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_foro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotos`
--

CREATE TABLE `fotos` (
  `foto_id` int(11) NOT NULL,
  `foto_foto` varchar(50) CHARACTER SET armscii8 NOT NULL,
  `foto_cat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fotos`
--

INSERT INTO `fotos` (`foto_id`, `foto_foto`, `foto_cat_id`) VALUES
(1, 'jug01.jpg', 1),
(2, 'jug02.jgp', 1),
(3, 'jug03.jpg', 1),
(4, 'jug04.jpg', 1),
(5, 'jug05.jpg', 2),
(6, 'jug06.jpg', 2),
(7, 'jug07.jpg', 2),
(8, 'jug08.jpg', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `tema_id` int(11) NOT NULL,
  `tema_tema` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`tema_id`, `tema_tema`) VALUES
(1, 'Luka Dončić'),
(2, 'Kyrie Irving'),
(3, 'Shaquille O\'Neal'),
(4, 'Stephen Curry'),
(5, 'LeBron James'),
(6, 'Anthony Edwards'),
(7, 'Giannis Antetokounmpo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `men_id` int(11) NOT NULL,
  `men_mensaje` mediumtext COLLATE utf8_spanish_ci NOT NULL,
  `men_tema_id` int(11) NOT NULL,
  `men_usu_id` int(11) NOT NULL,
  `men_fecha_hora` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`men_id`, `men_mensaje`, `men_tema_id`, `men_usu_id`, `men_fecha_hora`) VALUES
(1, 'Adornar la web', 2, 1, '2024-01-09 17:59:27'),
(2, 'Si no lo pillas, es cuestión de práctica', 2, 2, '2024-01-09 17:59:27'),
(3, 'Prueba', 2, 1, '2024-01-09 18:23:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usu_id` int(11) NOT NULL,
  `usu_nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `usu_alias` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `usu_password` varchar(256) COLLATE utf8_spanish_ci NOT NULL,
  `usu_foto` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `usu_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usu_id`, `usu_nombre`, `usu_alias`, `usu_password`, `usu_foto`, `usu_admin`) VALUES
(1, 'administrador', 'administrador', '91f5167c34c400758115c2a6826ec2e3', 'u01.gif', 1),
(2, 'usuario', 'usuario', 'f8032d5cae3de20fcec887f395ec9a6a', 'u02.gif', 0),
(3, 'Pepe', 'pepe', '926e27eecdbc7a18858b3798ba99bddd', 'u04.png', 0),
(7, 'Pepe2', 'pepe2', '926e27eecdbc7a18858b3798ba99bddd', 'u07.png', 0),
(8, 'Juana', 'juana', 'a94652aa97c7211ba8954dd15a3cf838', 'u03.gif', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `fotos`
--
ALTER TABLE `fotos`
  ADD PRIMARY KEY (`foto_id`);

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`tema_id`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`men_id`),
  ADD KEY `men_tema_id` (`men_tema_id`),
  ADD KEY `men_usu_id` (`men_usu_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usu_id`),
  ADD UNIQUE KEY `usu_alias` (`usu_alias`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `fotos`
--
ALTER TABLE `fotos`
  MODIFY `foto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `tema_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `men_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`men_usu_id`) REFERENCES `usuarios` (`usu_id`),
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`men_tema_id`) REFERENCES `jugadores` (`tema_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
