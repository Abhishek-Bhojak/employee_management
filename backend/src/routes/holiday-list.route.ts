import { Request, Response, Router, NextFunction } from "express";
import {HolidayListService} from "../services/holiday-list.service"
import HolidayList from "../entities/interfaces/holiday-list.interface"

const holidayListRouter: Router = Router({mergeParams:true});
const holidayListService:HolidayListService = new HolidayListService();

holidayListRouter.get('/set-holiday-list', async(req:Request, res:Response,next:NextFunction) => {
    try{
        const Holidays:HolidayList[] = await holidayListService.setHolidayList();
        res.status(200).json({message:'holiday list stored successfully',data:Holidays})
    }catch(err){
        res.json({error:err});
    }
});
holidayListRouter.get('/get-holiday-list', async(req:Request, res:Response,next:NextFunction) => {
    try{
        const Holidays:HolidayList[] = await holidayListService.getHolidayList();
        res.status(200).json(Holidays)
    }catch(err){
        res.json({error:err});
    }
});
export default holidayListRouter;