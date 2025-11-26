export function authMiddleware(req: any, res: any, next: any) {
    if(req.session?.user){//se o user tiver logado
        return next();//continua a request

    }

    return res.redirect('/usuario/login'); //senão volta pro login
}