import {Model} from 'sequelize'
import HolidayList from "../entities/interfaces/holiday-list.interface"
import db from "../models"
import axios from 'axios'
import dotenv from "dotenv";
import { promises } from 'dns'
export class HolidayListDao{
    constructor(){
        dotenv.config()
    }
    async setHolidayList(): Promise<HolidayList[]>{
        try{
            const key=process.env.API_KEY
            const calendarId = process.env.CALENDAR_ID as string
            const apiUrl=`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${key}`            
             // if(date.toLocaleDateString()==="28/12/2023"){
                 const response=await axios.get(apiUrl);
                   // console.log(response);
                   if(response.status===200) {
                     const data=response.data;
                     const items=data.items
                     const holidays=items.map((holiday:any)=> ({name:holiday.summary,date: holiday.start.date}))

                    const filterHoliday=holidays.filter((holiday:any)=>holiday.date.startsWith('2023'))
                    const model:Model[]= await db.HolidayListModel.bulkCreate(filterHoliday);
                    return []
                   }else{
                     console.log('unexpected response',response.status);            
                   }
                   return []
               }catch(err:any){
                 throw err.message
               }
    }
    async getHolidayList():Promise<HolidayList[]>{
        const HolidayList:Model[] = await db.HolidayListModel.findAll();
    return HolidayList.map((holiday: Model) => this.convertToEntity(holiday));

        return []
    }
    private convertToEntity(model: Model): HolidayList {
        const result = model.get({ plain: true });
        // delete result.errorcode;
        return result;
      }
}