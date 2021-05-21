# Prueba Técnica TrueHome

Para acceder a una versión online:

API: 
https://truehomeapi.edcilo.com/admin/
Usuario: admin
Contraseña: secret123.

Webapp:
https://truehome.edcilo.com/
Usuario: user01
Contraseña: secret123.

## Instalación

Clonar el proyecto

```
git clone git@github.com:edcilo/truehome_test.git
cd ./truehome_test
```

### Configurar API

Crear archivo .env para la api

```
cp api/.env.example api/.env
```

Modificar la variable `APP_ENV` a `prod` para habilitar el hambiente productivo

### Configurar WEBAPP

Instalar dependencias

```
cd ./webapp
yarn install
```

Construir proyecto 

```
yarn build 
cd ../
```

### Inicializar Docker

```
docker compose up 
```

### Inicializar Proyecto

```
docker compose exec truehome_api sh
python manage.py createsuperuser
```

## Credenciales

PostgreSQL

* Usuario: truehome
* Contraseña: secret
* Puerto: 5432
* Nombre DB: seller

## ToDo

- [ ] Instalar date-fns para gestión de fechas
- [ ] Instalar componente date picker
- [ ] Agregar paginación de clientes y actividades
- [ ] Agregar diseño responsivo
- [ ] Instalar paquete de iconos
- [ ] Agrear pruebas
