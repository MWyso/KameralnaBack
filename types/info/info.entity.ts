export interface InfoEntity {
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
}

export interface NewInfoEntity extends Omit<InfoEntity, 'id'> {
    id?: string;
}
