import {MenuEntity, NewMenuEntity} from "../types";
import {v4 as uuid} from "uuid";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";


type MenuRecordResult =[MenuRecord[], FieldPacket[]];


export class MenuRecord implements MenuEntity {
    id: string;
    name: string;
    description: string;
    price: number;
    active: boolean;

    constructor(obj: NewMenuEntity) {
        const {id, name, price, description, active} = obj;

        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.active = active;
    }

    private valid() {
        if (this.name.length < 3 || this.name.length > 50) {
            throw new ValidationError('The burger name must be more than 3 letters and less than 50 characters');
        }
        if (this.price <= 0) {
            throw new ValidationError('Burger price must be greater than 0');
        }
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid()
        }
        this.valid();
        await pool.execute("INSERT INTO `menu`('id', 'name', 'description', 'price' 'active')VALUES(:id, :name, :description, :price, :active)", {
            id: String(this.id),
            name: String(this.name),
            description: String(this.description),
            price: Number(this.price),
            active: Boolean(this.active),
        });
        return this.id;
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `menu` WHERE `id`= :id", {
            id: this.id,
        })
    }

    static async listAll(): Promise<MenuRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `menu` ORDER BY name ASC") as MenuRecordResult;
        return results.map(obj => new MenuRecord(obj));
    }

    static async getOne(id: string): Promise<MenuRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `menu` WHERE `id`= :id", {
            id,
        }) as MenuRecordResult;
        return results.length === 0 ? null : new MenuRecord(results[0]);
    }
}