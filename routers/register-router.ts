import {Router} from "express";
import {UserRecord} from "../records/user.record";
import {ValidationError} from "../utils/errors";
import {NewUserEntity} from "../types";
import {MenuRecord} from "../records/menu-record";

export const registerRouter = Router();

registerRouter

    .post('/', async (req, res) => {
        const newUser = new UserRecord(req.body as NewUserEntity);
        const newUserEmail = newUser.email;
        const oldUser = await UserRecord.getOne(newUserEmail);
        if(oldUser) {
            throw new ValidationError('User about this email already exists.')
        }
        await newUser.insert();

        res.json(newUser);
        // res.end();
    })

    .get('/', async (req, res): Promise<void> => {
        const user = await UserRecord.listAll();
        if (user === null) throw new ValidationError('There is no data in the database');

        res.json({
            user,

        });
    })

    .get('/:id', async (req, res): Promise<void> => {
        const user = await UserRecord.getOne(req.params.id);
        res.json(user);
    })