# Server

------------

## Necessary to start

------------

### If you use Windows

* Install WSL2
  * <https://docs.microsoft.com/fr-fr/windows/wsl/install-win10>

### Whatever you use

* Setup your vscode
  * <https://docs.microsoft.com/fr-fr/windows/wsl/tutorials/wsl-vscode>
* Install node and `npm`
  * <https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04>
* Setup your `.env`
  * `.env.local`
  * `.env.test`
* Add `ESLint` to your vscode extension
* Add `Prettier - Code formatter` to your vscode extension
  * Add `Prettier` to your default formatter document

### Database

There are two options for using a database :

#### Use Docker

##### Start Docker

To run docker, you must enter the following command:
(You will maybe need to use "sudo" to avoid some errors)

```bash
$> docker-compose up
```

##### Acess to DataBase and PgAdmin

By filling in the information in the .env files, you can have access to this database.  
If the Docker is launched on your machine, the host will be `localhost`. If it is launched on a remote machine, it will be the ip address of that machine.

Access ports are:
* PostgreSql : `5432`
* PgAdmin : `8000`

Make sure to create the "user_db" database in PgAdmin, if not defined.  
Then make sure you .env. has "user_db" as DB_USER.

#### Install podman

``` bash
$> . /etc/os-release
$> echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_${VERSION_ID}/ /" | sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
$> curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_${VERSION_ID}/Release.key | sudo apt-key add -
$> sudo apt-get update
$> sudo apt-get -y upgrade
$> sudo apt-get -y install podman
```

``` bash
$> podman run --name postgres-12 -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 docker.io/library/postgres:12
```

Run an already created image

``` bash
$> podman start postgres-12
```

If that throws an error, the easiest thing is to delete then re-create the container

``` bash
$> podman stop -l
$> podman rm postgres-12

# then re-run the command above
$> podman run --name postgres-12 -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 docker.io/library/postgres:12
```

#### Install PgAdmin

Use PgAdmin4 to administer PostgreSQL database

##### Windows OS

To download PgAdmin for windows, follow [this link](https://www.pgadmin.org/download/pgadmin-4-windows/)

##### Ubuntu OS

To download PgAdmin for ubuntu, follow [this link](https://www.pgadmin.org/download/pgadmin-4-apt/)

##### Configure PgAdmin

Make sure to

* Setup the "localhost" server in pgAdmin
* Create the "user_db" database in pgAdmin

Then  make sure you .env. has "user_db" as DB_USER

### Install PostgreSql clients

``` bash
$> sudo apt-get install postgresql-client-12
```

------------

## Run project

------------
### Start project for developper

```bash
$> npm run run-ts:local
```

### Test project

```bash
$> npm run test:integration
```

### Lint test with

```bash
$> npm run lint
```

### Build projet with

```bash
$> npm run build
```

## What you must do before push 😉

------------

1. Create and do your **integration test** and **unit test** (if it's needed)
2. Do your error handling if is needed

## Testing

------------

There are npm commands to run the tests
### Unit Tests

```bash
$> npm run test:unit
```

### Integration Tests
```bash
$> npm run test:integration
```
