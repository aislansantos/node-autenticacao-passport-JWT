import { Router } from "express";
import * as ApiController from "../controller/api.Controller";
import { privateRoute } from "../config/passport";


const router = Router();

router.get("/ping", ApiController.ping);

router.post("/register", ApiController.register);
router.post("/login", ApiController.login);

router.get("/list", privateRoute, ApiController.list);




export default router;