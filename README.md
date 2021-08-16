# Prueba Técnica Dogger

## Instalación

Clonar repositorio 

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
