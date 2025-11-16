CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(150)
);

CREATE TABLE livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    editora VARCHAR(100),
    ano_publicacao INT CHECK (ano_publicacao >= 0),
    status_leitura VARCHAR(20) DEFAULT 'não_lido' CHECK (status_leitura IN ('não_lido', 'lendo', 'lido')),
    data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT NOT NULL,
    id_categoria INT,
    capa VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS filme (
  id_filme SERIAL PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  diretor VARCHAR(100) NOT NULL,
  ano INT,
  data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_usuario INT NOT NULL REFERENCES usuario (id_usuario),
  capa VARCHAR(255)
);

