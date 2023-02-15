const Sequelize = require("sequelize")
const dbconfig = require('../config/config');

const sequelize = new Sequelize(
    dbconfig.DBNAME,
    dbconfig.USER,
    dbconfig.PASSWORD,
    {
        host: dbconfig.HOST,
        dialect:dbconfig.dialect,
        operatorAliases: false,
        port: dbconfig.DBPORT,
        pool:{
            max: dbconfig.pool.max,
            min: dbconfig.pool.min,
            acquire: dbconfig.pool.acquire,
            idle: dbconfig.pool.idle
        }
    }
) 

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.produk = require('./produk.model')(sequelize, Sequelize);
db.kategori = require('./kategori.model')(sequelize, Sequelize);

db.kategori.hasMany(db.produk, { foreignkey: "category_id", onDelete: 'SET NULL'});
db.produk.belongsTo(db.kategori, { foreignkey: "category_id", onDelete: 'SET NULL'});

module.exports = db;