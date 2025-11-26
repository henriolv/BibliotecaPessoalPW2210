import { connection } from "../infra/connection";


export type Usuario = {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    data_criacao?: string;
}

export async function inserir(usuario: Usuario) {
    
    await connection.query('INSERT INTO usuario(nome, email, senha) VALUES($1,$2,$3);',
    [
        usuario.nome,
        usuario.email,
        usuario.senha
    ]
);
}

export async function getByEmail(email:string){
    const{rows} = await connection.query('SELECT * FROM usuario Where email = $1',
        [email]
    );
    return rows[0];
    
}

export async function getbyEmailAndPassword(email: string, senha: string){
    const{ rows } = await connection.query(
    'SELECT * FROM usuario WHERE email=$1 AND senha=$2',
    [email, senha]
    );
    return rows[0];
}