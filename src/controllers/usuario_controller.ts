<<<<<<< HEAD
// Controle
// 1. recebe requisicoes HTTP
// 2. validar dados
// 3. validar regras de negocio
// 4. comunicar com a camada  MODEL
 
import { Request, Response } from "express";
import { Usuario, getByEmail, insert } from "../models/usuario";


//parte 1 ->funções que carregam paginas

//funcao que carrega  a pagina de login
=======
import { Request, Response } from "express";
import { Usuario, getByEmail, insert } from "../models/usuario";

// Página de login
>>>>>>> 8f144eb (Atualização do projeto (user/admin e controller))
export function mostrar_login(req: Request, res: Response) {
    res.render('login', {
        message: null
    });
}

<<<<<<< HEAD
//funcao que carrega a pagina de  listagem de usuario
=======
// Página da lista 
>>>>>>> 8f144eb (Atualização do projeto (user/admin e controller))
export function mostar_lista(req: Request, res: Response) {
    res.render('listar_usuario');
}

<<<<<<< HEAD
//parte 2 -> funções do CRUD

export async function registro(req: Request, res: Response) {
    const { nome, email, senha } = req.body;
=======
// Registrar usuário
export async function registro(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

>>>>>>> 8f144eb (Atualização do projeto (user/admin e controller))
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
<<<<<<< HEAD
                value: 'E-mail ja existe',
=======
                value: 'E-mail já existe',
>>>>>>> 8f144eb (Atualização do projeto (user/admin e controller))
                title: 'Dados inválidos'
            }
        });
    }

<<<<<<< HEAD
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
=======
    const usuario: Usuario = { nome, email, senha };
    await insert(usuario);

    return res.render('login', {
        message: {
            type: 'success',
            value: 'Usuário cadastrado com sucesso!',
>>>>>>> 8f144eb (Atualização do projeto (user/admin e controller))
            title: 'Sucesso'
        }
    });
}

<<<<<<< HEAD
// login handler
export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.render('login', {
      message: {
        type: 'error',
        value: 'Preencha email e senha!',
        title: 'Dados inválidos'
      }
    });
  }

  const usuario = await getByEmail(email);

  if (!usuario || usuario.senha !== senha) {
    return res.render('login', {
      message: {
        type: 'error',
        value: 'Email ou senha inválidos',
        title: 'Falha na autenticação'
      }
    });
  }

  // Autenticação
  return res.redirect('/');
}
=======
// Login 
export async function login(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.render('login', {
            message: {
                type: 'error',
                value: 'Preencha email e senha!',
                title: 'Dados inválidos'
            }
        });
    }

    const usuario = await getByEmail(email);

    if (!usuario || usuario.senha !== senha) {
        return res.render('login', {
            message: {
                type: 'error',
                value: 'Email ou senha inválidos',
                title: 'Falha na autenticação'
            }
        });
    }

    
    return res.redirect('/');
}
>>>>>>> 8f144eb (Atualização do projeto (user/admin e controller))
