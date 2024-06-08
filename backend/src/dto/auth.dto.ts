import { Boolean, Number, String, Literal, Array, Tuple, Record, Union } from 'runtypes';


export const CreateUserDto = Record({
    email: String,
    name: String,
    password: String.withConstraint(s => s.length >= 8)
})

export const LoginDto = Record({
    email: String,
    password: String.withConstraint(s => s.length >= 8)
})