import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import TerimaBarang from "./TerimaBarangModel.js";

const { DataTypes } = Sequelize;

const BarangKeluar = db.define(
  "barangkeluar",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kodeBarang: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tanggal: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    barang: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tujuan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

BarangKeluar.belongsTo(Users, { foreignKey: "userId" });
BarangKeluar.belongsTo(Users, { foreignKey: "tujuan" });

Users.hasMany(BarangKeluar, { foreignKey: "userId" });
Users.hasMany(BarangKeluar, { foreignKey: "tujuan" });

BarangKeluar.hasMany(TerimaBarang, { foreignKey: "barangKeluarId" });
TerimaBarang.belongsTo(BarangKeluar, { foreignKey: "barangKeluarId" });

export default BarangKeluar;
