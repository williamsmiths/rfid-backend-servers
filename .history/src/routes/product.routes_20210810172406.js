// import { Validator } from '../validation/validators';

// module.exports = app => {

//     const productController = require("../controllers/product.controller.js");
//     const AuthMiddleware = require("../middlewares/auth.middleware");
//     const PermissionsMiddleware = require("../middlewares/permissions.middlewares");

//     var router = require("express").Router();
//     const awaitHandlerFactory = require('../middlewares/awaitHandlerFactory.middleware');
   
//     // Create a new
//     router.get("/getall", awaitHandlerFactory(productController.getAllProduct));
//     router.get("/hasrfid", awaitHandlerFactory(productController.getAllHasRFID));
//     router.get("/norfid", awaitHandlerFactory(productController.getAllNoRFID));

//     router.get("/nhomsp/:ma_nhom_sp", awaitHandlerFactory(productController.getByMaNhomSp));

//     router.get("/id/:ID_danh_muc_sp", awaitHandlerFactory(productController.getByID));
//     router.get("/marfid/:ma_RFID", awaitHandlerFactory(productController.getByMaRFID));
//     router.get("/masp/:ma_san_pham", awaitHandlerFactory(productController.getByMaSp));

//     router.get("/tlgomtem/:TL_gom_tem", awaitHandlerFactory(productController.getTLGomTem));
//     router.get("/tlchuatem/:TL_chua_tem", awaitHandlerFactory(productController.getTLChuaTem));

//     router.get('/actived/:actived', awaitHandlerFactory(productController.getByActived)); 
    
//     router.delete('/id/:ID_danh_muc_sp', awaitHandlerFactory(productController.deleteByID)); 
//     router.delete('/marfid/:ma_RFID', awaitHandlerFactory(productController.deleteByMaRFID));
//     router.delete('/masp/:ma_san_pham', awaitHandlerFactory(productController.deleteByMaSp));    
    
//     //
//     // trường hợp User phải có quyền mới update được dữ liệu
//     router.patch("/up/:userId", [
//         AuthMiddleware.validJWTNeeded,
//         // PermissionsMiddleware.minimumPermissionLevelRequired(ADMIN),
//         PermissionsMiddleware.onlySameUserOrAdminCanDoThisAction,
//         // AuthController.patchById1
//     ]);
//     // PermissionsMiddleware.minimumPermissionLevelRequired(ADMIN)

//     router.post("/refresh", [
//         AuthMiddleware.JwtNeeded,
//         AuthMiddleware.verifyRefreshBodyField,
//         AuthMiddleware.validRefreshNeeded,
//         // AuthController.refresh_token
//       ]);


//     app.use('/api/product', router);
// };
