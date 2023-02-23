import {Router} from "express";

export const basketRouter = Router();

basketRouter

    .get('/', (req,res) => {
        res.redirect('/basket');
    });