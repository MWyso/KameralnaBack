import {Router} from "express";

export const lowrRouter = Router();

lowrRouter

    .get('/', (req,res) => {
        res.redirect('/order');
    });