import BarangKeluar from "../models/BarangKeluarModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getBarangKeluar = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await BarangKeluar.findAll({
        attributes: [
          "uuid",
          "kodeBarang",
          "tanggal",
          "barang",
          "jumlah",
          "kepada",
        ],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });
    } else {
      response = await BarangKeluar.findAll({
        attributes: [
          "uuid",
          "kodeBarang",
          "tanggal",
          "barang",
          "jumlah",
          "kepada",
        ],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBarangKeluarById = async (req, res) => {
  try {
    const barangKeluar = await BarangKeluar.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!barangKeluar)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await BarangKeluar.findOne({
        attributes: [
          "uuid",
          "kodeBarang",
          "tanggal",
          "barang",
          "jumlah",
          "kepada",
        ],
        where: {
          id: barangKeluar.id,
        },
        include: [
          {
            model: User,
            attributes: ["nama", "username"],
          },
        ],
      });
    } else {
      response = await BarangKeluar.findOne({
        attributes: [
          "uuid",
          "kodeBarang",
          "tanggal",
          "barang",
          "jumlah",
          "kepada",
        ],
        where: {
          [Op.and]: [{ id: barangKeluar.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["nama", "username"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createBarangKeluar = async (req, res) => {
  const { kodeBarang, tanggal, barang, jumlah, kepada } = req.body;
  try {
    await BarangKeluar.create({
      kodeBarang: kodeBarang,
      tanggal: tanggal,
      barang: barang,
      jumlah: jumlah,
      kepada: kepada,
      userId: req.userId,
    });

    res.status(201).json({ msg: "Data Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateBarangKeluar = async (req, res) => {
  try {
    const barangKeluar = await BarangKeluar.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!barangKeluar)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { kodeBarang, tanggal, barang, jumlah, kepada } = req.body;
    if (req.role === "admin") {
      await BarangKeluar.update(
        { kodeBarang, tanggal, barang, jumlah, kepada },
        {
          where: {
            id: barangKeluar.id,
          },
        }
      );
    } else {
      if (req.userId !== barangKeluar.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await BarangKeluar.update(
        { kodeBarang, tanggal, barang, jumlah, kepada },
        {
          where: {
            [Op.and]: [{ id: barangKeluar.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Data updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteBarangKeluar = async (req, res) => {
  try {
    const barangKeluar = await BarangKeluar.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!barangKeluar)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { kodeBarang, tanggal, barang, jumlah, kepada } = req.body;
    if (req.role === "admin") {
      await BarangKeluar.destroy({
        where: {
          id: barangKeluar.id,
        },
      });
    } else {
      if (req.userId !== barangKeluar.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await BarangKeluar.destroy({
        where: {
          [Op.and]: [{ id: barangKeluar.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Data deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
