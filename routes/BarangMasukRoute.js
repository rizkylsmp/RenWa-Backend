import express from "express";
import {
  getBarangMasuk,
  getBarangMasukById,
  createBarangMasuk,
  updateBarangMasuk,
  deleteBarangMasuk,
} from "../controllers/BarangMasuk.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/barang-masuk", verifyUser, adminOnly, getBarangMasuk);
router.get("/barang-masuk/:id", verifyUser, adminOnly, getBarangMasukById);
router.post("/barang-masuk", verifyUser, adminOnly, createBarangMasuk);
router.patch("/barang-masuk/:id", verifyUser, adminOnly, updateBarangMasuk);
router.delete("/barang-masuk/:id", verifyUser, adminOnly, deleteBarangMasuk);

export default router;
