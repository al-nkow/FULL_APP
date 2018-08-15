## NodeJS Express Mongo server boilerplate

1. install mongoDb
2. npm install
3. npm start

##### TODO:
1. Add mongodb password!
2. Move mongo address, port, password into ENV
#####

```
{
    "email": "mail@mail.com",
    "password": "qwerty"
},
{
    "email": "admin@mail.com",
    "password": "admin"
}
```

1. npm start - to run server (watch mode)
2. npm run front - to run landing page (watch mode)

!!! All images you need in style.scss - put into frontend/img



#### Add admin panel
````
1. admin - npm run build
2. copy index.html into public/admin/index.html
3. index.html: fix all paths with /admin/..
4. copy all folders from /static/ to server static/admin
5. copy all files from /static/ to server static/admin
````