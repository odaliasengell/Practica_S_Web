# Checklist de requisitos - Taller TypeORM

Estado de entrega de los requisitos solicitados por el taller:

- Configuración del proyecto y conexión
  - package.json, tsconfig.json, dependencias: OK (`package.json`, `tsconfig.json`)
  - DataSource TypeORM: OK (`src/data-source.ts`)

- Desarrollo del modelo de dominio (entidades)
  - Entidades `Guia`, `Tour`, `Reserva` implementadas: OK (`src/entities`)
  - Cada entidad con PK autoincremental y al menos 4 propiedades: OK
  - Relaciones implementadas (OneToMany / ManyToOne): OK

- Lógica de persistencia (servicios)
  - Servicios CRUD (create, findAll, findOne, update, remove): OK (`src/services`)
  - Acceso a repositorios por medio del DataSource: OK

- Prueba funcional y seeding
  - Script principal para inicializar DataSource y realizar seed: OK (`src/main.ts`)
  - Inserción de datos y pruebas CRUD visibles en consola: OK (ejecutar `npm run seed`)

- DER y documentación
  - DER como SVG: OK (`docs/der.svg`) embebido en `README.md`
  - schema.sql para importar en herramientas: OK (`docs/schema.sql`)

- Entregables extras añadidos
  - README con instrucciones y documentación: OK (`README.md`)
  - Ejemplo de commit log por integrante: OK (`docs/commit_log.txt`)
