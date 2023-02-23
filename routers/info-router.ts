import {Router} from "express";
import {InfoRecord} from "../records/info-record";
import { ValidationError } from "../utils/errors";

export const infoRouter = Router();

infoRouter

    .get('/', async (req, res): Promise<void> => {
        const info = await InfoRecord.listAll();
        if (info === null) throw new ValidationError('There is no data in the database');

        res.json({
            info,
        });

    })

    // .get('/', async (req, res) => {
    //     const { id, street, number, zipCode, city, phone, email, monday, tuesThurs, friSat, sunday} = req.body;
    //
    //     const info = await InfoRecord;
    //     if (info === null) throw new ValidationError('There is no data in the database');
    //
    //     res.json({
    //         id,
    //         street,
    //         number,
    //         zipCode,
    //         city,
    //         phone,
    //         email,
    //         monday,
    //         tuesThurs,
    //         friSat,
    //         sunday,
    //     } as InfoRecord);
    //
    // })