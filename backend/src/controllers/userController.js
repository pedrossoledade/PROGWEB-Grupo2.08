const userService = require('../services/userService');

class UserController {

    async register(req, res){
        try {
            const result = await userService.register(req.body);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(error.message.includes('já existe') ? 400 : 500)
               .json({ message: error.message || 'Internal server error' });
        }
    }

    async login(req, res){
        try {
            const result = await userService.login(req.body);
            console.log('result', result);
            res.status(200).json(result); 
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(error.message.includes('obrigatório') ? 400 : 401)
               .json({ message: error.message || 'Internal server error' });
        }
    }
}

module.exports = new UserController();

