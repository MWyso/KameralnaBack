export interface InfoEntity {
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
}

export interface NewInfoEntity extends Omit<InfoEntity, 'id'> {
    id?: string;
}
