import { Validator } from '../validation/validators';
// import { auth } from "../controllers/user.controller.js";
module.exports = app => {
    // const router = express.Router()
    // const auth = require("../controllers/user.controller.js");
    const AuthMiddleware = require("../middlewares/auth.middleware");
    const PermissionsMiddleware = require("../middlewares/permissions.middlewares");

    // import { Validator } from '../validation/validators.js'
    // const AuthController = require("../controllers/user.controller");
    // const config = require("../config/config");
    var router = require("express").Router();
    const awaitHandlerFactory = require('../middlewares/awaitHandlerFactory.middleware');

    const userController = require('../controllers/user.controller.js');
   
    // const  Validator = require('../validation/validators');

    // Create a new
    router.get("/getall", awaitHandlerFactory(userController.getAllUser));
    router.get('/id/:ID_tai_khoan', awaitHandlerFactory(userController.getUserById)); 
    router.get('/username/:user_name', awaitHandlerFactory(userController.getUserByUserName)); 
    router.get('/role/:role', awaitHandlerFactory(userController.getUserByRole)); 
    router.get('/actived/:actived', awaitHandlerFactory(userController.getUserByActived)); 
    router.delete('/id/:ID_tai_khoan', awaitHandlerFactory(userController.deleteByUserID)); 
    router.delete('/username/:user_name', awaitHandlerFactory(userController.deleteByUserName)); 


    router.post(
        "/singin",
        Validator.login,
        awaitHandlerFactory(userController.userLogin)
      );


    router.post("/singup", Validator.register, awaitHandlerFactory(userController.registerUser));
    // router.post("/singin", auth.loginUser);

    // // trường hợp toàn quyền get Không cần token
    // router.get("/list", AuthController.list);

    // // trường hợp lấy theo ID user và cần có token
    // router.get("/:userId", [
    //     AuthMiddleware.validJWTNeeded,
    //     AuthController.getById
    // ]);

    // trường hợp User phải có quyền mới update được dữ liệu
    router.patch("/up/:userId", [
        AuthMiddleware.validJWTNeeded,
        // PermissionsMiddleware.minimumPermissionLevelRequired(ADMIN),
        PermissionsMiddleware.onlySameUserOrAdminCanDoThisAction,
        // AuthController.patchById1
    ]);
    // PermissionsMiddleware.minimumPermissionLevelRequired(ADMIN)

    router.post("/refresh", [
        AuthMiddleware.JwtNeeded,
        AuthMiddleware.verifyRefreshBodyField,
        AuthMiddleware.validRefreshNeeded,
        // AuthController.refresh_token
      ]);


    app.use('/api/user', router);
};
