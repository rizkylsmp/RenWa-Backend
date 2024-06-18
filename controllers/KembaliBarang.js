import KembaliBarang from "../models/KembaliBarangModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getKembaliBarang = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await KembaliBarang.findAll({
        attributes: ["uuid", "kodeBarang", "tanggal", "barang", "jumlah"],
        include: [
          {
            model: User,
            attributes: ["nama", "username"],
          },
        ],
      });
    } else {
      response = await KembaliBarang.findAll({
        attributes: ["uuid", "kodeBarang", "tanggal", "barang", "jumlah"],
        where: {
          userId: req.userId,
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

export const getKembaliBarangById = async (req, res) => {
  try {
    const kembaliBarang = await KembaliBarang.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kembaliBarang)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await KembaliBarang.findOne({
        attributes: ["uuid", "kodeBarang", "tanggal", "barang", "jumlah"],
        where: {
          id: kembaliBarang.id,
        },
        include: [
          {
            model: User,
            attributes: ["nama", "username"],
          },
        ],
      });
    } else {
      response = await KembaliBarang.findOne({
        attributes: ["uuid", "kodeBarang", "tanggal", "barang", "jumlah"],
        where: {
          [Op.and]: [{ id: kembaliBarang.id }, { userId: req.userId }],
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

export const createKembaliBarang = async (req, res) => {
  const { kodeBarang, tanggal, barang, jumlah } = req.body;
  try {
    await KembaliBarang.create({
      kodeBarang: kodeBarang,
      tanggal: tanggal,
      barang: barang,
      jumlah: jumlah,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Data Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateKembaliBarang = async (req, res) => {
  try {
    const kembaliBarang = await KembaliBarang.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kembaliBarang)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { kodeBarang, tanggal, barang, jumlah } = req.body;
    if (req.role === "admin") {
      await KembaliBarang.update(
        { kodeBarang, tanggal, barang, jumlah },
        {
          where: {
            id: kembaliBarang.id,
          },
        }
      );
    } else {
      if (req.userId !== kembaliBarang.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await KembaliBarang.update(
        { kodeBarang, tanggal, barang, jumlah },
        {
          where: {
            [Op.and]: [{ id: kembaliBarang.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Data updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteKembaliBarang = async (req, res) => {
  try {
    const kembaliBarang = await KembaliBarang.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kembaliBarang)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { kodeBarang, tanggal, barang, jumlah } = req.body;
    if (req.role === "admin") {
      await KembaliBarang.destroy({
        where: {
          id: kembaliBarang.id,
        },
      });
    } else {
      if (req.userId !== kembaliBarang.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await KembaliBarang.destroy({
        where: {
          [Op.and]: [{ id: kembaliBarang.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Data deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
