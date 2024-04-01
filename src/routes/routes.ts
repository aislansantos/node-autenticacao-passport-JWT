
import * as ApiController from "../controller/api.Controller";

import { Auth } from "../middlewares/auth"

const router = Router();

router.get("/ping", ApiController.ping);

router.post("/register", ApiController.register);
router.post("/login", ApiController.login);

router.get("/list", Auth.private, ApiController.list);




export default router;