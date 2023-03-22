export interface MenuEntity {
    id?: string;
    name: string;
    price: number;
    description: string;
    active?: boolean;
    img?: string | File;
}

export interface NewMenuEntity extends Omit<MenuEntity, 'id'> {
    id?: string;
}

