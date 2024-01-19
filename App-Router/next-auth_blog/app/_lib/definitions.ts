// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type RegisterUserForm = {
    username: string,
    email: string,
    password: string,
    cmp_password: string,
}

export type UpdateUserForm = {
    username: string,
    email: string,
    password: string,
    image: string,
    
}

export type FormUser = {
    name: string,
    email: string,
    username: string,
    password: string,
}

export type SignInUserForm = {
    username: string | null,
    email: string | null,
    password: string | null,
}