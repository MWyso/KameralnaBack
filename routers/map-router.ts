import {Router} from "express";
import {MapRecord} from "../records/map-record";

export const mapRouter = Router()

    .get('/:id', async (req, res) => {
        const map = await MapRecord.getOne(req.params.id);
        res.json(map);
    })

    .get('/', async (req, res) => {
        const maps = await MapRecord.findAll();
        res.json(maps);
    })

    .post('/', async (req, res) => {
        const map = new MapRecord(req.body);
        await map.insert();
        res.json(map);
    })