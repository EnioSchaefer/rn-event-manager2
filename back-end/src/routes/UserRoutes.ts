import { Router } from "express";
import UserController from "../controllers/UserController";

const userRouter = Router();

userRouter.post('/register', UserController.registerUser);
userRouter.post('/login', UserController.loginUser);
userRouter.post('/create', UserController.createUser);
userRouter.get('/find/:id', UserController.findOneUser);
userRouter.get('/findall', UserController.findAllUsers);
userRouter.put('/edit', UserController.editUser);
userRouter.patch('/changepass', UserController.changePassword);
userRouter.delete('/delete/:id', UserController.deleteUser);

export default userRouter;