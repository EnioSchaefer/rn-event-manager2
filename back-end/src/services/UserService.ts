import UserModel from "../database/models/UserModel";
import { ApiResponse } from "../database/types/ApiResponse";
import { EditableUser, User } from "../database/types/User";

async function registerUser(userData: User): Promise<ApiResponse> {
    const {dataValues} = await UserModel.create(userData);

    return ({type: null, message: dataValues});
}

async function loginUser(email: string, password: string): Promise<ApiResponse> {
    const userDB = await UserModel.findOne({where: {email}});

    if (!userDB) return ({type: 401, message: 'Invalid email'});

    if (userDB.password !== password) return ({type: 401, message: 'Invalid password'});

    return ({type: null, message: 'Ok'});
};

async function createUser(userData: User): Promise<ApiResponse> {
    const {dataValues} = await UserModel.create(userData);

    return ({type: null, message: dataValues});
};

async function findOneUser(email: string): Promise<ApiResponse> {
    const userDB = await UserModel.findOne({where: {email}});

    if (!userDB) return ({type: 404, message: 'User not found'});

    return ({type: null, message: userDB});
};

async function findAllUsers(): Promise<ApiResponse> {
    const users = await UserModel.findAll();

    return ({type: null, message: users});
};

async function editUser(userEditInfo: EditableUser): Promise<ApiResponse> {
    const userDB = await UserModel.findOne({where: {email: userEditInfo.email}});

    const {email, ...userEditInfoWithoutEmail} = userEditInfo;

    userDB?.update({...userEditInfoWithoutEmail});

    return ({type: null, message: userEditInfo});
};

async function deleteUser(email: string): Promise<ApiResponse> {
    await UserModel.destroy({where: {email}});

    return ({type: null, message: 'Ok'});
};

export default {
    createUser,
    loginUser,
    findOneUser,
    findAllUsers,
    editUser,
    deleteUser,
};