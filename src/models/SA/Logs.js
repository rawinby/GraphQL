import Conn from "../../config/database";
import Sequelize from "sequelize";
import moment from "moment";

const LogModel = Conn.define('sa_logs', {
    log_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    level: {
        type: Sequelize.STRING,
    },
    header: {
        type: Sequelize.STRING,
    },
    request: {
        type: Sequelize.STRING,
    },
    response: {
        type: Sequelize.STRING,
    },
    create_datetime: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('GETDATE'),
        get() {
            if (moment(this.getDataValue('create_datetime')).isValid()) {
                return moment.utc(this.getDataValue('create_datetime')).format();
            } else {
                return null;
            }
        },
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
});

module.exports = {
    LogModel,
}