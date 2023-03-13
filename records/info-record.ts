import {InfoEntity, NewInfoEntity} from "../types";
import {v4 as uuid} from "uuid";
import {ValidationError} from "../utils/errors";
import {emailValidRegEx} from "../utils/email-validation";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type InfoRecordResult = [InfoRecord[], FieldPacket[]];


export class InfoRecord implements InfoEntity {
    id?: string;
    street: string;
    number: string;
    zipCode: string;
    city: string;
    phone: string;
    email: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    orderNumber: number;

    constructor(obj: InfoEntity) {
        const {id, street, number, zipCode, city, phone, email, monday, tuesday, wednesday, thursday, friday, saturday, sunday, orderNumber} = obj;

        this.id = id;
        this.street = street;
        this.number = number;
        this.zipCode = zipCode;
        this.city = city;
        this.phone = phone;
        this.email = email;
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
        this.saturday = saturday;
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
        if (!this.id) {
            this.id = uuid()
        }
        this.valid();
        await pool.execute("INSERT INTO `info`('id', 'street', 'number', 'zipCode', 'city', 'phone', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' 'sunday', 'orderNumber')VALUES(:id, :street, :number, :zipCode, :city, :phone, :monday, :tuesday, :wednesday, :thursday, :saturday, :sunday, :orderNumber)", {
            id: String(this.id),
            street: String(this.street),
            number: String(this.number),
            zipCode: String(this.zipCode),
            city: String(this.city),
            phone: String(this.phone),
            email: String(this.email),
            monday: String(this.monday),
            tuesday: String(this.tuesday),
            wednesday: String(this.wednesday),
            friday: String(this.friday),
            saturday: String(this.saturday),
            sunday: String(this.sunday),
            orderNumber: Number(this.orderNumber),
        });
        return this.id;
    }


    static async listAll(): Promise<InfoRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `info`") as InfoRecordResult;
        return results.map(obj => new InfoRecord(obj));
    }


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