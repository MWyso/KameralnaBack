import {MenuEntity} from "../types";
import {v4 as uuid} from "uuid";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import { AddonsEntity } from "../types/addons/addons.entity";
import {promises as fs} from "fs";
import path from "path";

type MenuRecordResult =[MenuRecord[], FieldPacket[]];


export class MenuRecord implements MenuEntity {
    id?: string;
    name: string;
    price: number;
    addons: AddonsEntity[];
    active: boolean;
    img: string | File;

    constructor(obj: MenuRecord) {
        const {id, name, price, addons, active, img} = obj;

        this.id = id ?? uuid();
        this.name = name;
        this.price = price;
        this.addons = addons;
        this.active = active;
        this.img = img;
    }

    private valid() {
        if (this.name.length < 3 || this.name.length > 50) {
            // fs.unlink(path.join(__dirname, '../../public', 'images', this.img));
            throw new ValidationError('The burger name must be more than 3 letters and less than 50 characters');
        }
        // if (this.addons.length < 3) {
        //     // fs.unlink(path.join(__dirname, '../../public', 'images', this.img));
        //     throw new ValidationError('Count addons must be greater than 3');
        // }
        if (this.price <= 0) {
            // fs.unlink(path.join(__dirname, '../../public', 'images', this.img));
            throw new ValidationError('Burger price must be greater than 0');
        }
        if (!this.img) {
            throw new ValidationError('The img of burger is missing');
        }
    }
}