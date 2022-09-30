create database asistencia;

use asistencia;

create table semestre (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    gestion VARCHAR(50) NOT NULL
);

create table practicante (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    ci VARCHAR(20) NOT NULL,
    carrera VARCHAR(50) NOT NULL,
    mencion VARCHAR(50) NOT NULL,
    foto VARCHAR(255) NOT NULL,
    hora INT NOT NULL,
    cel INT NOT NULL,
    estado VARCHAR(50) NOT NULL,
    idSemestre INT NOT NULL,
    codigo VARCHAR(100),
    CONSTRAINT fk_semestre FOREIGN KEY (idSemestre) REFERENCES semestre(id)
);

create table administrador (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    user VARCHAR(50) NOT NULL,
    pass VARCHAR(255) NOT NULL
);

create table registro ( 
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idPracticante INT NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) NOT NULL,
    CONSTRAINT fk_practicante FOREIGN KEY (idPracticante) REFERENCES practicante(id)
);