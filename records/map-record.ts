import {MapEntity, NewMapEntity, SimpleMapEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

type MapRecordResults = [MapEntity[], FieldPacket[]];

export class MapRecord implements MapEntity {
    id: string;
    name: string;
    address: string;
    city: string;
    phone: string;
    monday: string;
    tuesThurs: string;
    friSat: string;
    sun: string;
    lat: number;
    lon: number;
    constructor(obj: NewMapEntity) {
        if(!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta, ani przekraczać 100 znaków.');
        }

        if(typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia!');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.address = obj.address;
        this.city = obj.city;
        this.phone = obj.phone;
        this.monday = obj.monday;
        this.tuesThurs = obj.tuesThurs;
        this.friSat = obj.friSat;
        this.sun = obj.sun;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

    static async getOne(id: string): Promise<MapRecord | null> {
        const [results] = (await pool.execute('SELECT * FROM `map` WHERE id= :id', {
            id,
        })) as MapRecordResults;
        return results.length === 0 ? null : new MapRecord(results[0]);
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted!');
        }

        await pool.execute("INSERT INTO `map`(`id`, `name`, `address`, `city` `phone`, `monday`, `tuesThurs`, `friSat` `sun`, `lat`, `lon`) VALUES(:id, :name, :address, :city, :phone, :monday, :tuesThurs, :friSat, :sun, :lat, :lon)",{
            id: this.id,
            name: this.name,
            address: this.address,
            city:  this.city,
            phone:  this.phone,
            monday:  this.monday,
            tuesThurs:  this.tuesThurs,
            friSat:  this.friSat,
            sun:  this.sun,
            lat: this.lat,
            lon: this.lon,
        });
    }

    static async findAll(): Promise<SimpleMapEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `map`") as MapRecordResults;

        return results.map(result => {
            const {
                id, lat, lon,
            } = result;

            return {
                id, lat, lon,
            };
        });
    }
}