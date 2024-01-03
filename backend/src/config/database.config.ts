import { NextFunction,Request,Response } from "express";
import {Sequelize} from 'sequelize'
// import { Sequelize } from "sequelize";
import db from '../models'
export const databaseConnector=async (req:Request,res:Response,next:NextFunction)=>{
	console.log('in db configuration');
	
	try {
		console.log('in databaseConnector');
		await db.sequelize.connect();
		next();
	} catch (err) {
		console.error('Error encountered in the api handler');
		console.error(err);
	}
}