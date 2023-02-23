import {InfoEntity, NewInfoEntity} from "../types";
import {v4 as uuid} from "uuid";
import {ValidationError} from "../utils/errors";
import {emailValidRegEx} from "../utils/email-validation";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type InfoRecordResult =[InfoRecord[], FieldPacket[]];


export class InfoRecord implements InfoEntity {
    id?: string;
    street: string;
    number: string;
    zipCode: string;
    city: string;
    phone: string;
    email: string;
    monday: string;
    tuesThurs: { from: string; to: string; };
    friSat: { from: string; to: string; };
    sunday: { from: string; to: string; };
    orderNumber: number;

    constructor(obj: InfoEntity) {
        const {id, street, number, zipCode, city, phone, email, monday, tuesThurs, friSat, sunday, orderNumber} = obj;

        this.id = id ?? uuid();
        this.street = street;
        this.number = number;
        this.zipCode = zipCode;
        this.city = city;
        this.phone = phone;
        this.email = email;
        this.monday = monday;
        this.tuesThurs = tuesThurs;
        this.friSat = friSat;
        this.sunday = sunday;
        this.orderNumber = orderNumber || 1;
    }

    private valid() {
        if (this.street.length <= 3 || this.street.length > 50)
            throw new ValidationError('Street name must by greater than 3 characters and less than 50 characters');
        if (this.number.length <= 0 || this.number.length > 10)
            throw new ValidationError('Number must by greater than 0 characters and less than 10 characters');
        if (this.zipCode.length <= 3 || this.zipCode.length > 10)
            throw new ValidationError('Zip Code by greater than 3 characters and less than 15 characters');
        if (this.city.length < 3 || this.city.length > 30)
            throw new ValidationError('City name must by greater than 3 characters and less than 30 characters');
        if (this.phone.length <= 5 || this.phone.length > 15)
            throw new ValidationError('Phone must by greater than 5 characters and less than 15 characters');
        if (!emailValidRegEx(this.email)) throw new ValidationError('E-mail has to be correct');

    }

    async insert(): Promise<string> {
        this.valid();
        await pool.execute("INSERT INTO `info`('id', 'street', 'number', 'zipCode', 'city', 'phone', 'monday', 'tuesThurs', 'friSat', 'sunday', 'orderNumber')VALUES(:id, :street, :number, :zipCode, :city, :phone, :monday, :tuesThurs, :friSat, :sunday, :orderNumber)", {
            id: String(this.id),
            street: String(this.street),
            number: String(this.number),
            zipCode: String(this.zipCode),
            city: String(this.city),
            phone: String(this.phone),
            email: String(this.email),
            monday: String(this.monday),
            tuesThurs: this.tuesThurs,
            friSat: this.friSat,
            sunday: String(this.sunday),
            orderNumber: this.orderNumber,
        });
        return this.id;
    }


    static async listAll(): Promise<InfoRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `info`") as InfoRecordResult;
        return results.map(obj => new InfoRecord(obj));
    }

    // async update(): Promise<string> {
    //     this.valid();
    //     await pool.execute("UPDATE `info` SET ('id'=:id, 'street'=:street, 'number'=:number, 'zipCode'=:zipCode, 'city'=:city, 'phone'=:phone, 'monday'=:monday, 'tuesThurs'=:tuesThurs, 'friSat'=:friSat, 'sunday'=:sunday, 'orderNumber'=:orderNumber)", {
    //         id: String(this.id),
    //         street: String(this.street),
    //         number: String(this.number),
    //         zipCode: String(this.zipCode),
    //         city: String(this.city),
    //         phone: String(this.phone),
    //         email: String(this.email),
    //         monday: String(this.monday),
    //         tuesThurs: this.tuesThurs,
    //         friSat: this.friSat,
    //         sunday: String(this.sunday),
    //         orderNumber: this.orderNumber,
    //     });
    //
    //     return this.id;
    // }



    static async getOne(id: string): Promise<InfoRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `info` WHERE `id`= :id", {
            id,
        }) as InfoRecordResult;
        return results.length === 0 ? null : new InfoRecord(results[0]);
    }

    static async isOrderNumber(orderNumber: number): Promise<InfoRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `info` WHERE `orderNumber`= :orderNumber", {
            orderNumber,
        }) as InfoRecordResult;
        return results;
    }

};