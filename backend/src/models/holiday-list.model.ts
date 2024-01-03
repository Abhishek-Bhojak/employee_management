import {Model, Sequelize} from 'sequelize';
import HolidayList from '../entities/interfaces/holiday-list.interface';
interface HolidayListInterface
extends Omit<HolidayList , "createdAt" | "updatedAt">{}
module.exports = (sequelize:any,DataTypes:any)=>{
    
    class HolidayListModel extends Model<HolidayListInterface>
    implements HolidayListInterface{
        id!:string;
        name!:string;
        date!:string;
    }
    HolidayListModel.init({
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        date:{
            type:DataTypes.DATE,
            allowNull:false,
        }
    },{
        sequelize,
        tableName: "holiday-list",
    })
    return  HolidayListModel;
}