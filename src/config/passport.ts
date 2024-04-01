import { Request, Response, NextFunction } from "express";
import passport, { use } from "passport";
import dotenv from "dotenv";
import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from "passport-jwt"; // aqui renomeamos a função que estamos importando
import jwt from "jsonwebtoken";
import { User, UserInstance } from "../models/User";

dotenv.config();

const notAuthorizedJson = {
    status: 401,
    message: "Não autorizado."
}

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}


passport.use(new JWTStrategy(options, async (payload, done) => {
    const user = await User.findByPk(payload.id);
    if (user) {
        return done(null, user);
    }
    return done(notAuthorizedJson, false);

}));

export const generateToken = (data: object) => {
    return jwt.sign(data, process.env.JWT_SECRET as string);
}


export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", (err: Error, user: UserInstance) => {
        req.user = user;
        return user ? next() : next(notAuthorizedJson);
    })(req, res, next);
};

export default passport;