import LoggedUser from '../domain/models/Usuario.js';

export default function create (userToCreate) {
        const user = new LoggedUser(userToCreate.userId, userToCreate.name, userToCreate.lastName, 
            userToCreate.dni, userToCreate.type, userToCreate.token);
        return user;
    }
