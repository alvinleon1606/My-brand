import express from 'express'
import UsersController from '../controllers/userRegistration';

const Router = express.Router();


Router.post('/register', UsersController.userRegistration);






export default Router;