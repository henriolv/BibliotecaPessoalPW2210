// Controle
// 1. recebe requisicoes HTTP
// 2. validar dados
// 3. validar regras de negocio
// 4. comunicar com a camada  MODEL
 
import { Request, Response } from "express";
import { Usuario, getByEmail, insert } from "../models/usuario";


//parte 1 ->funções que carregam paginas

//funcao que carrega  a pagina de login
export function mostrar_login(req: Request, res: Response) {
    res.render('login', {
        message: null
    });
}

//funcao que carrega a pagina de  listagem de usuario
export function mostar_lista(req: Request, res: Response) {
    res.render('listar_usuario');
}

//parte 2 -> funções do CRUD

export async function registro(req: Request, res: Response) {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.render('login', {
            message: {
                type: 'error',
                value: 'Preencha corretamente todos os dados!',
                title: 'Dados inválidos'
            }
        });
    }

    const usuario_encontrado = await getByEmail(email);

    if (usuario_encontrado) {
        return res.render('login', {
            message: {
                type: 'error',
                value: 'E-mail ja existe',
                title: 'Dados inválidos'
            }
        });
    }

    const usuario: Usuario = {
        nome,
        email,
        senha
    };

    await insert(usuario);

    res.render('login', {
        message: {
            type: 'success',
            value: 'Usuario cadastrado com sucesso!',
            title: 'Sucesso'
        }
    });
}