import {Router} from "express";
import {MenuRecord} from "../records/menu-record";
import {ValidationError} from "../utils/errors";
import {NewMenuEntity} from "../types";


export const menuRouter = Router();

menuRouter

    .get('/', async (req, res): Promise<void> => {
        const menu = await MenuRecord.listAll();
        if (menu === null) throw new ValidationError('There is no data in the database');

        res.json({
            menu,

        });
    })

    .get('/:id', async (req, res): Promise<void> => {
        const menu = await MenuRecord.getOne(req.params.id);
        res.json(menu);
    })

    .post('/', async (req, res): Promise<void> => {
        const newItem = new MenuRecord(req.body as NewMenuEntity);
        await newItem.insert();

        res.json(newItem);
    })

    .delete('/:id', async (req, res): Promise<void> => {
        const item = await MenuRecord.getOne(req.params.id);

        if (!item) {
            throw new ValidationError('No such gift');
        }

        await item.delete();

        res.end();
    })