//tipos

import { connection } from "../infra/connection";

export type Usuario = {
    id?: number;
    nome: string;
    email: string;
    senha:  string;
    data_criacao?: string;
}


//funcoes  de conexao  com o banco

export async function insert (usuario:  Usuario){
       await connection.query('INSERT INTO  usuario(nome, email, senha) VALUES($1, $2, $3);',
            [
                usuario.nome,
                usuario.email,
                usuario.senha,
            ]
        );
}


export async function getByEmail(email: string) {
    const { rows } = await connection.query(
        'SELECT * FROM usuario WHERE email=$1',
        [email]
    );
    return rows[0];
}