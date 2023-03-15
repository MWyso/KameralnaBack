import {Router} from "express";
import {MenuRecord} from "../records/menu-record";
import {ValidationError} from "../utils/errors";


export const menuRouter = Router();

menuRouter

    .get('/', async (req, res): Promise<void> => {
        const menu = await MenuRecord.listAll();
        if (menu === null) throw new ValidationError('There is no data in the database');

        res.json({
            menu,

        });
    })

    .get('/:id', async (req, res) => {
        const menu = await MenuRecord.getOne(req.params.id);
        res.json(menu);
    })