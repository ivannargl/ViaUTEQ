CREATE DATABASE IF NOT EXISTS VU;
USE VU;

CREATE TABLE lugares (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  latitud DECIMAL(10, 7) NOT NULL,
  longitud DECIMAL(10, 7) NOT NULL
);

CREATE TABLE caminos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  origen_id INT NOT NULL,
  destino_id INT NOT NULL,
  distancia_metros DECIMAL(10, 2) NOT NULL,
  ruta JSON NOT NULL,
  FOREIGN KEY (origen_id) REFERENCES lugares(id),
  FOREIGN KEY (destino_id) REFERENCES lugares(id)
);

INSERT INTO lugares (nombre, latitud, longitud) VALUES
('Entrada', 20.6532521, -100.4040197),
('Acceso1', 20.6533725, -100.4046150),
('Estacionamiento 1', 20.6534190, -100.4043130),
('División Económica – Administrativa C', 20.6540536, -100.4051934),
('Laboratorio de Mantenimiento Industrial E', 20.6538823, -100.4039169),
('Laboratorios de Procesos Industriales D', 20.6540353, -100.4045218),
('Módulo Sanitario 1', 20.6541632, -100.4041200),
('Estacionamiento 2', 20.6537436, -100.4058476),
('División Industrial F', 20.6545272, -100.4041285),
('División de Tecnologías de la Automatización e Información K', 20.6543949, -100.4046280),
('Rectoría A', 220.65430121774409, -100.40570847732438),
('Vinculación B', 20.6540596, -100.4060984),
('Estacionamiento 3', 20.6541344, -100.4069093),
('Puerta 6 Acceso al Auditorio', 20.6555542, -100.4070314),
('Edificio de Medios (División Idiomas)', 20.6550284, -100.4063050),
('Laboratorios de Mecatrónica y TICs J', 20.6552469, -100.4054569),
('Servicio Médico', 20.6551950, -100.4051560),
('División Tecnología Ambiental H', 20.6553701, -100.4046031),
('Laboratorio de Sistemas Informáticos I', 20.654905581048673, -100.4044431546301),
('Cafetería UTEQ', 20.654652, -100.404986), 
('Biblioteca', 20.6548370, -100.4037790),
('División Económica – Administrativa G', 20.6556458, -100.4038890),
('División Industrial Nanotecnología Y', 20.6558881, -100.4048675),
('Auditorio', 20.655742, -100.405888),
('Módulo Sanitario 2', 20.6562028, -100.4042067),
('Cancha de Basquetbol', 20.6564909, -100.4055067),
('Cancha de Futbol Rápido', 20.6568432, -100.4054949),
('Campo de Futbol y Pista de Atletismo', 20.6572529, -100.4052916),
('Almacén General y Taller de Mantenimiento', 20.6560886, -100.4038611),
('Puerta 4', 20.6563421, -100.4032382),
('Centro de Creatividad e Innovación 4.0 CI', 20.6575296, -100.4034430),
('Edificio PIDET (Posgrado, Innovación, Desarrollo y Emprendimiento Tecnológico)', 20.6578793, -100.4034849),
('Centro Cultural Comunitario', 20.6584694, -100.4052097),
('Instituto de Artes y Oficios Sede Epigmenio González', 20.6575266, -100.4045507);

-- Script para insertar rutas en la tabla caminos
-- Todas las rutas parten de la entrada (origen_id = 1)

-- Función para calcular distancia aproximada (usando fórmula de Haversine simplificada para distancias cortas)
-- Nota: Las distancias son aproximadas y están en metros

-- Cafetería (destino_id = 20)
INSERT INTO caminos (origen_id, destino_id, distancia_metros, ruta) VALUES (
    1, 20, 350.00,
    '[
        {"latitude":  20.6532521, "longitude": -100.4040197},
        {"latitude": 20.653306, "longitude": -100.404101},
        {"latitude": 20.653359, "longitude": -100.404083},
        {"latitude": 20.653408, "longitude": -100.404083},
        {"latitude": 20.653541, "longitude": -100.404113},
        {"latitude": 20.653905, "longitude": -100.404205},
        {"latitude": 20.654141, "longitude": -100.404262},
        {"latitude": 20.654225, "longitude": -100.404402},
        {"latitude": 20.654227, "longitude": -100.404456},
        {"latitude": 20.654205, "longitude": -100.404544},
        {"latitude": 20.654199, "longitude": -100.404598},
        {"latitude": 20.654135, "longitude": -100.404979},
        {"latitude": 20.654137, "longitude": -100.405002},
        {"latitude": 20.654169, "longitude": -100.405021},
        {"latitude": 20.654397, "longitude": -100.405076},
        {"latitude": 20.654587, "longitude": -100.405111},
        {"latitude": 20.654613, "longitude": -100.405121},
        {"latitude": 20.654622, "longitude": -100.405095},
        {"latitude": 20.654636, "longitude": -100.405024},
        {"latitude": 20.654652, "longitude": -100.404986}
    ]'
);

-- Biblioteca (destino_id = 21)
INSERT INTO caminos (origen_id, destino_id, distancia_metros, ruta) VALUES (
    1, 21, 280.00,
    '[
        {"latitude":  20.6532521, "longitude": -100.4040197},
        {"latitude": 20.653359, "longitude": -100.404083},
        {"latitude": 20.653408, "longitude": -100.404083},
        {"latitude": 20.654096, "longitude": -100.404250},
        {"latitude": 20.654170, "longitude": -100.404288},
        {"latitude": 20.654233, "longitude": -100.404352},
        {"latitude": 20.654313, "longitude": -100.404367},
        {"latitude": 20.654493, "longitude": -100.404415},
        {"latitude": 20.654539, "longitude": -100.404435},
        {"latitude": 20.654569, "longitude": -100.404392},
        {"latitude": 20.654592, "longitude": -100.404243},
        {"latitude": 20.654641, "longitude": -100.403936},
        {"latitude": 20.654655, "longitude": -100.403894},
        {"latitude": 20.654679, "longitude": -100.403894},
        {"latitude": 20.654731, "longitude": -100.403911},
        {"latitude": 20.654740, "longitude": -100.403904},
        {"latitude": 20.654747, "longitude": -100.403867},
        {"latitude": 20.654760, "longitude": -100.403777},
        {"latitude": 20.654773, "longitude": -100.403762},
        {"latitude": 20.654796, "longitude": -100.403765},
        {"latitude": 20.654832, "longitude": -100.403774}
    ]'
);

-- Auditorio (destino_id = 24)
INSERT INTO caminos (origen_id, destino_id, distancia_metros, ruta) VALUES (
    1, 24, 520.00,
    '[
        {"latitude":  20.6532521, "longitude": -100.4040197},
        {"latitude": 20.653306, "longitude": -100.404101},
        {"latitude": 20.653359, "longitude": -100.404083},
        {"latitude": 20.653408, "longitude": -100.404083},
        {"latitude": 20.653541, "longitude": -100.404113},
        {"latitude": 20.653905, "longitude": -100.404205},
        {"latitude": 20.654141, "longitude": -100.404262},
        {"latitude": 20.654225, "longitude": -100.404402},
        {"latitude": 20.654227, "longitude": -100.404456},
        {"latitude": 20.654205, "longitude": -100.404544},
        {"latitude": 20.654199, "longitude": -100.404598},
        {"latitude": 20.654141, "longitude": -100.405008},
        {"latitude": 20.654519, "longitude": -100.405108},
        {"latitude": 20.655038721604676, "longitude": -100.40524437317117},
        {"latitude": 20.655057, "longitude": -100.405297},
        {"latitude": 20.655180, "longitude": -100.405317},
        {"latitude": 20.655290, "longitude": -100.405326},
        {"latitude": 20.655436, "longitude": -100.405349},
        {"latitude": 20.655524, "longitude": -100.405381},
        {"latitude": 20.655536, "longitude": -100.405439},
        {"latitude": 20.655536, "longitude": -100.405539},
        {"latitude": 20.655545, "longitude": -100.405644},
        {"latitude": 20.655569, "longitude": -100.405749},
        {"latitude": 20.655639, "longitude": -100.405774},
        {"latitude": 20.655756, "longitude": -100.405796},
        {"latitude": 20.655742, "longitude": -100.405888}
    ]'
);

-- Enfermería/Servicio Médico (destino_id = 17)
INSERT INTO caminos (origen_id, destino_id, distancia_metros, ruta) VALUES (
    1, 17, 250.00,
    '[
        {"latitude":  20.6532521, "longitude": -100.4040197},
        {"latitude": 20.653306, "longitude": -100.404101},
        {"latitude": 20.653359, "longitude": -100.404083},
        {"latitude": 20.653408, "longitude": -100.404083},
        {"latitude": 20.653541, "longitude": -100.404113},
        {"latitude": 20.653905, "longitude": -100.404205},
        {"latitude": 20.654141, "longitude": -100.404262},
        {"latitude": 20.654225, "longitude": -100.404402},
        {"latitude": 20.654227, "longitude": -100.404456},
        {"latitude": 20.654205, "longitude": -100.404544},
        {"latitude": 20.654199, "longitude": -100.404598},
        {"latitude": 20.654141, "longitude": -100.405008},
        {"latitude": 20.654519, "longitude": -100.405108},
        {"latitude": 20.655038721604676, "longitude": -100.40524437317117},
        {"latitude": 20.65506944866616, "longitude": -100.4051950201438},
        {"latitude": 20.655162, "longitude": -100.405149},
        {"latitude" : 20.6551950, "longitude": -100.4051560}
    ]'
);

-- Edificio K - División de Tecnologías de la Automatización e Información (destino_id = 10)
INSERT INTO caminos (origen_id, destino_id, distancia_metros, ruta) VALUES (
    1, 10, 180.00,
    '[
        {"latitude":  20.6532521, "longitude": -100.4040197},
        {"latitude": 20.653306, "longitude": -100.404101},
        {"latitude": 20.653359, "longitude": -100.404083},
        {"latitude": 20.653408, "longitude": -100.404083},
        {"latitude": 20.653541, "longitude": -100.404113},
        {"latitude": 20.653905, "longitude": -100.404205},
        {"latitude": 20.654141, "longitude": -100.404262},
        {"latitude": 20.654225, "longitude": -100.404402},
        {"latitude": 20.654227, "longitude": -100.404456},
        {"latitude": 20.654205, "longitude": -100.404544},
        {"latitude": 20.654199, "longitude": -100.404598}
    ]'
);

-- Edificio J - Laboratorios de Mecatrónica y TICs (destino_id = 16)
INSERT INTO caminos (origen_id, destino_id, distancia_metros, ruta) VALUES (
    1, 16, 230.00,
    '[
        {"latitude":  20.6532521, "longitude": -100.4040197},
        {"latitude": 20.653306, "longitude": -100.404101},
        {"latitude": 20.653359, "longitude": -100.404083},
        {"latitude": 20.653408, "longitude": -100.404083},
        {"latitude": 20.653541, "longitude": -100.404113},
        {"latitude": 20.653905, "longitude": -100.404205},
        {"latitude": 20.654141, "longitude": -100.404262},
        {"latitude": 20.654225, "longitude": -100.404402},
        {"latitude": 20.654227, "longitude": -100.404456},
        {"latitude": 20.654205, "longitude": -100.404544},
        {"latitude": 20.654199, "longitude": -100.404598},
        {"latitude": 20.654141, "longitude": -100.405008},
        {"latitude": 20.654519, "longitude": -100.405108},
        {"latitude": 20.655038721604676, "longitude": -100.40524437317117},
        {"latitude": 20.655042, "longitude": -100.405347},
        {"latitude": 20.655047, "longitude": -100.405451},
        {"latitude": 20.65522066958138, "longitude": -100.405476951853}
    ]'
);

-- Edificio I - Laboratorio de Sistemas Informáticos (destino_id = 19)
INSERT INTO caminos (origen_id, destino_id, distancia_metros, ruta) VALUES (
    1, 19, 200.00,
    '[
        {"latitude":  20.6532521, "longitude": -100.4040197},
        {"latitude": 20.653306, "longitude": -100.404101},
        {"latitude": 20.653359, "longitude": -100.404083},
        {"latitude": 20.653408, "longitude": -100.404083},
        {"latitude": 20.653541, "longitude": -100.404113},
        {"latitude": 20.653905, "longitude": -100.404205},
        {"latitude": 20.654141, "longitude": -100.404262},
        {"latitude": 20.654236961416146, "longitude": -100.4043594734988},
        {"latitude": 20.654446, "longitude": -100.404414},
        {"latitude": 20.654556, "longitude": -100.404429},
        {"latitude": 20.654590, "longitude": -100.404265},
        {"latitude": 20.654611, "longitude": -100.404160},
        {"latitude": 20.654779, "longitude": -100.404193},
        {"latitude": 20.654754, "longitude": -100.404312},
        {"latitude": 20.654739, "longitude": -100.404402},
        {"latitude": 20.654905581048673, "longitude": -100.4044431546301}
    ]'
);

-- Servicios Escolares (necesitamos encontrar el ID correspondiente en la tabla lugares)
-- Basándome en la ruta, podría ser Vinculación B (destino_id = 12)
INSERT INTO caminos (origen_id, destino_id, distancia_metros, ruta) VALUES (
    1, 12, 450.00,
    '[
        {"latitude":  20.6532521, "longitude": -100.4040197},
        {"latitude": 20.653306, "longitude": -100.404101},
        {"latitude": 20.653359, "longitude": -100.404083},
        {"latitude": 20.653673, "longitude": -100.404161},
        {"latitude": 20.653887039274725, "longitude": -100.40420610148792},
        {"latitude": 20.653846, "longitude": -100.404366},
        {"latitude": 20.653820, "longitude": -100.404488},
        {"latitude": 20.653785, "longitude": -100.404612},
        {"latitude": 20.653744, "longitude": -100.404845},
        {"latitude": 20.653833, "longitude": -100.404880},
        {"latitude": 20.653936, "longitude": -100.404906},
        {"latitude": 20.653963960731012, "longitude": -100.40491260263794},
        {"latitude": 20.653951, "longitude": -100.405069},
        {"latitude": 20.653929, "longitude": -100.405197},
        {"latitude": 20.653992, "longitude": -100.405245},
        {"latitude": 20.654063, "longitude": -100.405299},
        {"latitude": 20.654032, "longitude": -100.405393},
        {"latitude": 20.654005, "longitude": -100.405566},
        {"latitude": 20.653998339267396, "longitude": -100.40567736047919},
        {"latitude": 20.654086, "longitude": -100.405677},
        {"latitude": 20.654180, "longitude": -100.405702},
        {"latitude": 20.65430121774409, "longitude": -100.40570847732438},
        {"latitude": 20.654243, "longitude": -100.405867},
        {"latitude": 20.654221, "longitude": -100.405961},
        {"latitude": 20.654200, "longitude": -100.406096},
        {"latitude": 20.654185, "longitude": -100.406148},
        {"latitude": 20.65412002973725, "longitude": -100.40610954465124}
    ]'
);

-- Rectoría A (destino_id = 11)
INSERT INTO caminos (origen_id, destino_id, distancia_metros, ruta) VALUES (
    1, 11, 400.00,
    '[
        {"latitude":  20.6532521, "longitude": -100.4040197},
        {"latitude": 20.653306, "longitude": -100.404101},
        {"latitude": 20.653359, "longitude": -100.404083},
        {"latitude": 20.653673, "longitude": -100.404161},
        {"latitude": 20.653887039274725, "longitude": -100.40420610148792},
        {"latitude": 20.653846, "longitude": -100.404366},
        {"latitude": 20.653820, "longitude": -100.404488},
        {"latitude": 20.653785, "longitude": -100.404612},
        {"latitude": 20.653744, "longitude": -100.404845},
        {"latitude": 20.653833, "longitude": -100.404880},
        {"latitude": 20.653936, "longitude": -100.404906},
        {"latitude": 20.653963960731012, "longitude": -100.40491260263794},
        {"latitude": 20.653951, "longitude": -100.405069},
        {"latitude": 20.653929, "longitude": -100.405197},
        {"latitude": 20.653992, "longitude": -100.405245},
        {"latitude": 20.654063, "longitude": -100.405299},
        {"latitude": 20.654032, "longitude": -100.405393},
        {"latitude": 20.654005, "longitude": -100.405566},
        {"latitude": 20.653998339267396, "longitude": -100.40567736047919},
        {"latitude": 20.654086, "longitude": -100.405677},
        {"latitude": 20.654180, "longitude": -100.405702},
        {"latitude": 20.65430121774409, "longitude": -100.40570847732438}
    ]'
);


-- Insertar caminos con rutas intermedias (simuladas)
INSERT INTO caminos (origen_id, destino_id, distancia_metros, ruta) VALUES
-- Entrada → Acceso1 
(1, 2, 120.0,
'[
	{"latitude": 20.6532521, "longitude": -100.4040197},
	{"latitude": 20.653526, "longitude": -100.404196},
	{"latitude": 20.653501, "longitude": -100.404378},
	{"latitude": 20.653465, "longitude": -100.404641},
	{"latitude": 20.6533725, "longitude": -100.4046150}
  ]'
);
