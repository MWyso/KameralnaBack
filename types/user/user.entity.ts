export interface UserEntity {
    id?: string;
    name: string;
    email: string;
    password: string;
}

export interface NewUserEntity extends Omit<UserEntity, 'id'> {
    id?: string;
}

