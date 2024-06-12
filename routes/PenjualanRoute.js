import express from "express";
import {
    getPenjualan,
    getPenjualanById,
    createPenjualan,
    updatePenjualan,
    deletePenjualan
} from "../controllers/Penjualan.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/products', verifyUser, getPenjualan);
router.get('/products/:id', verifyUser, getPenjualanById);
router.post('/products', verifyUser, createPenjualan);
router.patch('/products/:id', verifyUser, updatePenjualan);
router.delete('/products/:id', verifyUser, deletePenjualan);

export default router;