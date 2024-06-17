import express from "express";
import {
  getTerimaBarang,
  getTerimaBarangById,
  createTerimaBarang,
  updateTerimaBarang,
  deleteTerimaBarang,
} from "../controllers/TerimaBarang.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/terima-barang", verifyUser, getTerimaBarang);
router.get("/terima-barang/:id", verifyUser, getTerimaBarangById);
router.post("/terima-barang", verifyUser, createTerimaBarang);
router.patch("/terima-barang/:id", verifyUser, updateTerimaBarang);
router.delete("/terima-barang/:id", verifyUser, deleteTerimaBarang);

export default router;
