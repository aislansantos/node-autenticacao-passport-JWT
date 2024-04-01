import { Request, Response } from "express";
import { User } from "../models/User";
import { generateToken } from "../config/passport";

export const ping = (req: Request, res: Response) => {
    res.json({ pong: true })
}


export const register = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let { email, password } = req.body;

        let hasUser = await User.findOne({
            where: { email }
        });
        if (!hasUser) {
            let newUser = await User.create({ email, password });
            const token = generateToken({ id: newUser.id });

            return res.status(201).json({ id: newUser.id, token });
        } else {
            return res.status(500).json({ error: "Usuário ja existe." });
        }

    }
    return res.status(500).json({ error: "E-mail e/ou senha não enviados." });
}


export const login = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;


        let user = await User.findOne({
            where: {
                email,
                password
            }
        });

        if (user) {
            const token = generateToken({ id: user.id });
            return res.json({ status: true, token })
        }
    }

    return res.json({ status: false })
}


export const list = async (req: Request, res: Response) => {
    console.log("User: ", req.user);

    let users = await User.findAll();
    let list: string[] = [];

    users.forEach((item => list.push(item.email)))

    return res.json({ list })
}
