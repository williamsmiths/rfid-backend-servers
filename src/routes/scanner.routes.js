import { Validator } from '../validation/validators';

module.exports = app => {

    const scannerController = require("../controllers/scanner.controller.js");
    const AuthMiddleware = require("../middlewares/auth.middleware");
    const PermissionsMiddleware = require("../middlewares/permissions.middlewares");

    var router = require("express").Router();
    const awaitHandlerFactory = require('../middlewares/awaitHandlerFactory.middleware');
   
    router.get("/getall", awaitHandlerFactory(scannerController.getAllScanner));
    router.get('/id/:ID_lich_su_quet', awaitHandlerFactory(scannerController.getByID)); 

    router.get('/scantram', awaitHandlerFactory(scannerController.get_OneTram_AllDay)); 
    router.post('/scancamtay',Validator.HistoryScan, awaitHandlerFactory(scannerController.get_CamTay_AllDay)); 
    
    router.delete('/id/:ID_lich_su_quet', awaitHandlerFactory(scannerController.deleteByID));  
    
    //
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


    app.use('/api/scanner', router);
};
