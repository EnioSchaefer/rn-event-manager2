import { Request, Response } from "express";
import { EditableUser, User } from "../database/types/User";
import UserService from "../services/UserService";

async function registerUser(req: Request, res: Response) {
    try {
        const userData: User = req.body;
    
        const {type, message} = await UserService.registerUser(userData);

        if (type) return res.status(type).send(message);

        return res.status(201).send(message);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function loginUser(req: Request, res: Response) {
    try {
        const {email, password} = req.body;

        const {type, message} = await UserService.loginUser(email, password);

        if (type) return res.status(type).send(message);

        return res.status(200).send(message);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function createUser(req: Request, res: Response) {
    try {
        const userData: User = req.body;

        const {type, message} = await UserService.createUser(userData);

        if (type) return res.status(type).send(message);

        return res.status(201).send(message);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function findOneUser(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const numberId = Number(id);

        const {type, message} = await UserService.findOneUser(numberId);

        if (type) return res.status(type).send(message);

        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function findAllUsers(req: Request, res: Response) {
    try {
        const {message} = await UserService.findAllUsers();

        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function editUser(req: Request, res: Response) {
    try {
        const userEditInfo: EditableUser = req.body;

        const {message} = await UserService.editUser(userEditInfo);

        return res.status(200).send(message);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function changePassword(req: Request, res: Response) {
    try {
        const {currPassword, newPassword, userId} = req.body;

        const {type, message} = await UserService.changePassword(currPassword, newPassword, userId);

        if (type) return res.status(type).send(message);

        return res.status(200).send(message);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function deleteUser(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const numberId = Number(id);

        const {message} = await UserService.deleteUser(numberId);

        return res.status(200).send(message);
    } catch (error) {
        return res.status(500).json(error);
    }
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
}