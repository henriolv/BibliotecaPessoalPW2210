import { Request, Response } from "express";

export async function show_adm(req: Request, res: Response){
    const { user } = req.session as any
    res.render('adm', { user });
}