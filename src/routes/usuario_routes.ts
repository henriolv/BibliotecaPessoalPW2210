import { Router } from "express";
import { registro, mostar_lista, mostrar_login } from "../controllers/usuario_controller";
const usuarioRoutes = Router();


usuarioRoutes.get('/usuario/login', mostrar_login);
usuarioRoutes.get('/usuario/list', mostar_lista);
usuarioRoutes.post('/usuario/register', registro);
export  {
    usuarioRoutes
}