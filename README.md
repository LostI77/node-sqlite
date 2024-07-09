# SQLite de forma nativa en Node.js

Es curioso como SQLite esta ganando mas atención estos meses en el desarrollo web. Cada vez se usa mas en nuevos proyectos y aplicaciones web ya que SQLite posee un alto rendimiento y es ligera ^^. Actualmente es un poco pesado aprender SQLite a fondo, pero yendo al punto. 

SQLite se ha hecho muy popular por el buen rendimiento y facilidad que da a la hora de ser implementada, [bun (un entorno de ejecución de javascript)](https://bun.sh/docs/api/sqlite) ya implemento SQLite de forma nativa y la comunidad lo recibió alegremente.

En mi experiencia personal SQLite es divertido, muy rápido de implementar, anteriormente lo probé con prisma mucho antes de que node.js implemente sqlite de forma nativa.

Parece que esta implementación de SQLite no funciona de forma `async` es `sync`
SQLite se ejecuta en proceso (limitado por la CPU)
Tiene flag: `--experimental-sqlite`
Se pueden ejecutar Querys de SQLite.

```mjs
import { DatabaseSync } from 'node:sqlite';
const database = new DatabaseSync(':memory:');
database.exec(`
  CREATE TABLE data(
    key INTEGER PRIMARY KEY,
    value TEXT
  ) STRICT
`);

const insert = database.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
```

Las importaciones a Commonjs y ECMAScript Modules es un hecho ^^

```mjs
import sqlite from 'node:sqlite';
import sqlite from 'sqlite';
```
```cjs
const sqlite = require('node:sqlite');
const sqlite = require('sqlite');
```
## Class `DatabaseSync`

Puedes crear a la base de datos SQLite con la clase `DatabaeSync`

```js
const mySQLiteDatabase = new DatabaseSync(location[, options])
```
## location (string)
La ubicación de la base de datos. Una base de datos SQLite puede almacenarse en un archivo o completamente en memoria. Para utilizar una base de datos en archivo, la ubicación debe ser una ruta de archivo. Para utilizar una base de datos en memoria, la ubicación debe ser el nombre especial ':memory:'.

## options (object)
Opciones de configuración para la conexión a la base de datos. Se admiten las siguientes opciones
- open (boolean)  Si es true, la base de datos es abierta por el constructor. Cuando este valor es false, la base de datos debe abrirse mediante el método open(). Por defecto: true.

## *.close()

El metodo `*.close()` Cierra la conexión a la base de datos, si esta no esta abierta se lanza una excepción. [(Envoltura de)](https://www.sqlite.org/c3ref/close.html)

## *.exec(sql)

Este metodo permite inyectar/ejecutar Querys de SQLite! [(Envoltura de)](https://www.sqlite.org/c3ref/exec.html)

## *.open()

Abre la base de datos si location no esta definido en el constructor `DatabaseSync`. Este método sólo debe utilizarse cuando la base de datos no se abre mediante el constructor y esta lanza una excepción si la base de datos ya está abierta.

Pueden ver mas al respecto en estos links debajo ^^ la verdad esta todo super interesante aun asi, no me gusta del todo que no sea `async` toca esperar para que sea de esta forma

[Pull Request](https://github.com/nodejs/node/pull/53752)
[sqlite.md](https://github.com/cjihrig/node/blob/sqlite/doc/api/sqlite.md)
[Youtube Video](https://www.youtube.com/watch?v=CDyBH8ecUxc)
