import express from "express";
import {
  getKembaliBarang,
  getKembaliBarangById,
  createKembaliBarang,
  updateKembaliBarang,
  deleteKembaliBarang,
} from "../controllers/KembaliBarang.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/kembali-barang", verifyUser, getKembaliBarang);
router.get("/kembali-barang/:id", verifyUser, getKembaliBarangById);
router.post("/kembali-barang", verifyUser, createKembaliBarang);
router.patch("/kembali-barang/:id", verifyUser, updateKembaliBarang);
router.delete("/kembali-barang/:id", verifyUser, deleteKembaliBarang);

export default router;
