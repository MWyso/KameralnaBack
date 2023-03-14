export interface NewMapEntity extends Omit<MapEntity, 'id'> {
    id?: string;
}

export interface SimpleMapEntity {
    id: string;
    lat: number;
    lon: number;
}

export interface MapEntity extends SimpleMapEntity {
    name: string;
    address: string;
    city: string;
    phone: string;
    monday: string;
    tuesThurs: string;
    friSat: string;
    sun: string;
}