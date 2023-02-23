import { AddonsEntity } from "../addons/addons.entity";

export interface MenuEntity {
    id?: string;
    name: string;
    price: number;
    addons: AddonsEntity[];
    active: boolean;
    img: string | File;
}

