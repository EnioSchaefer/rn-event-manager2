import UserModel from "../database/models/UserModel";
import { ApiResponse } from "../database/types/ApiResponse";
import { EditableUser, User } from "../database/types/User";
import { comparePassword, hashPassword } from "../utils/passwordHashing";

async function registerUser(userData: User): Promise<ApiResponse> {
    const userDB = await UserModel.findOne({where: {email: userData.email}});

    if (userDB) return ({type: 401, message: 'This email already has an account'});

    const hashedPassword = await hashPassword(userData.password);
    const hashedUserData = {...userData, password: hashedPassword};

    await UserModel.create(hashedUserData);

    return ({type: null, message: 'Account created successfully!'});
}

async function loginUser(email: string, password: string): Promise<ApiResponse> {
    const userDB = await UserModel.findOne({where: {email}});

    if (!userDB) return ({type: 401, message: 'Invalid email'});

    const validatePassword = comparePassword(userDB.password, password);
    if (!validatePassword) return ({type: 401, message: 'Invalid password'});

    return ({type: null, message: 'Log-in successful!'});
};

async function createUser(userData: User): Promise<ApiResponse> {
    const userDB = await UserModel.findOne({where: {email: userData.email}});

    if (userDB) return ({type: 401, message: 'This email already has an account'});

    const hashedPassword = await hashPassword(userData.password);
    const hashedUserData = {...userData, password: hashedPassword};

    await UserModel.create(hashedUserData);

    return ({type: null, message: 'User created'});
};

async function findOneUser(id: number): Promise<ApiResponse> {
    const userDB = await UserModel.findByPk(id);

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

    return ({type: null, message: 'Changes applied successfully!'});
};

async function changePassword(currPassword: string, newPassword: string, userId: number): Promise<ApiResponse> {
    const userDB = await UserModel.findByPk(userId);
    const validatePassword = await comparePassword(currPassword, userDB!.password);

    if (!validatePassword) return ({type: 401, message: 'Incorrect password'});

    const hashedPassword = await hashPassword(newPassword);
    userDB?.update({password: hashedPassword});

    return ({type: null, message: 'Password changed successfully!'});
};

async function deleteUser(userId: number): Promise<ApiResponse> {
    await UserModel.destroy({where: {id: userId}});

    return ({type: null, message: 'User deleted'});
};

export default {
    registerUser,
    loginUser,
    createUser,
    findOneUser,
    findAllUsers,
    editUser,
    changePassword,
    deleteUser,
};