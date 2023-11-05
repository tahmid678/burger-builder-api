

const user = {
    email: 't@gmail.com',
    password: '1234'
}

const error = schema.validate(user);
console.log(error);