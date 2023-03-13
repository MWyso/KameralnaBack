import {Router} from "express";
import {InfoRecord} from "../records/info-record";
import {ValidationError} from "../utils/errors";

export const infoRouter = Router();

infoRouter

    .get('/', async (req, res): Promise<void> => {
        const info = await InfoRecord.listAll();
        if (info === null) throw new ValidationError('There is no data in the database');

        res.json({
            info,
        });

    })