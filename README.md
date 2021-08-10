## Project setup

```
npm install
```
"start": "nodemon src/index.js --exec babel-node"
### Run

```
npm run start
```

API test

## Register : GET ALL USSER

```
localhost:8020/api/cms_user/getall
[
  {
    "id": 2,
    "username": "admin",
    "salt": "$2a$10$2FQ2HbJBR7PStBeS/sbwze",
    "email": "admin@admin.com",
    "display_name": "admin",
    "user_status": 1,
    "group_id": 1,
    "store_id": 1,
    "created": "2017-09-25T16:01:53.000Z",
    "updated": "2019-06-14T01:38:30.000Z",
    "logined": "2019-06-14T16:38:05.000Z",
    "ip_logged": "::1",
    "recode": "",
    "code_time_out": ""
  },
  {
    "id": 8,
    "username": "000000",
    "salt": "IFzV6%)ykZvjh$tb3I%33frQ)5C^*w#FxP%p1CVoH5Dh&xZEF)pQg*Qjt%@TsjZKU25cy",
    "email": "namit@admin.com",
    "display_name": "namit",
    "user_status": 0,
    "group_id": 1,
    "store_id": 0,
    "created": "2019-06-14T01:39:27.000Z",
    "updated": null,
    "logined": "2019-06-14T16:36:03.000Z",
    "ip_logged": "::1",
    "recode": "",
    "code_time_out": ""
  }]
```
## Register USER POST

 ```
localhost:8020/api/cms_user/singup
{
	"username" :"adminss",
	"password": "123456789",
	"salt":"null",
	"email" : "admins1@gmail.com",
	"display_name":"admins",
	"user_status" : 1,
	"group_id": 1,
	"store_id": "58"
}
```
---
<!--
## Login POST

```
localhost:8020/api/cms_user/singin
{
	"email" : "conghuancses@gmail.com",
	"password": "123456789"
}
# EX. result
{
  "success": true,
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTksIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiY29uZ2h1YW5jc2VzQGdtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6ImFkbWluIiwicGVybWlzc2lvbkxldmVsIjoxLCJpYXQiOjE2MjA5MDM4NDQsImV4cCI6MTYyMDkwNzQ0NH0.RSRYkrcOCxHxQvEMeSC7sgYQUARL0PmHh1uqkhpcUSc",
  "refresh_token": "$2a$10$b6e/cs5LYxUCDKN55n4nZO2IxeVfE9Th45o1UFkzcdmKiUhXmMEbm"
}
```

## get Product : GET

```
localhost:8020/api/product/


## Update VAT  : PUT
localhost:8020/api/product/:id
Header token | authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTksIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiY29uZ2h1YW5jc2VzQGdtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjIwODk1MjI4LCJleHAiOjE2MjA4OTg4Mjh9.YLmohCtFFGpAIPNLGTT36Ea3Jp6o0V0T11pFn-y6hVY
{
	"prd_vat":  10

}
```

## delete product : PATCH (chỉ có admin mới có quyền xóa sản phẩm)

```
localhost:8020/api/product/119
Header token | authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTksIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiY29uZ2h1YW5jc2VzQGdtYWlsLmNvbSIsImRpc3BsYXlfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjIwODk1MjI4LCJleHAiOjE2MjA4OTg4Mjh9.YLmohCtFFGpAIPNLGTT36Ea3Jp6o0V0T11pFn-y6hVY
{
	"delete":  1
}
``` -->
