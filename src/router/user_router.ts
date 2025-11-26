import {Router} from 'express';
import {  show_login, register, login } from '../controller/user_controller';

const usuarioRoutes = Router() 

usuarioRoutes.get('/usuario/login', show_login);
usuarioRoutes.post('/usuario/register', register);

usuarioRoutes.post('/usuario/login', login);

export {
    usuarioRoutes
}