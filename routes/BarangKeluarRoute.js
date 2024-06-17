import express from "express";
import {
  getBarangKeluar,
  getBarangKeluarById,
  createBarangKeluar,
  updateBarangKeluar,
  deleteBarangKeluar,
} from "../controllers/BarangKeluar.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/barang-keluar", verifyUser, adminOnly, getBarangKeluar);
router.get("/barang-keluar/:id", verifyUser, adminOnly, getBarangKeluarById);
router.post("/barang-keluar", verifyUser, adminOnly, createBarangKeluar);
router.patch("/barang-keluar/:id", verifyUser, adminOnly, updateBarangKeluar);
router.delete("/barang-keluar/:id", verifyUser, adminOnly, deleteBarangKeluar);

export default router;
