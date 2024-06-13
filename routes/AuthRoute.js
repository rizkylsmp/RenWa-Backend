import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { Login, logOut, Me } from "../controllers/Auth.js";

const router = express.Router();

router.get("/me", verifyToken, Me);
router.post("/login", verifyToken, Login);
router.delete("/logout", verifyToken, logOut);

export default router;
