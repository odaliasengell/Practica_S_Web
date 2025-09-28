# 🏖️ Catálogo de Restaurantes de Manta

## 📋 Información del Proyecto
- **Título:** Catálogo de Restaurantes de Manta - Arquitectura del Dominio con Métodos Asíncronos  
- **Asignatura:** Aplicaciones para el Servidor Web  
- **Nivel:** Quinto  
- **Período Lectivo:** 2025-2026(2)  
- **Docente:** John Cevallos  

## 👥 Integrantes y Contribuciones
| Estudiante     | Contribución Principal |
|----------------|-------------------------|
| Odalia Senge Loor    | Implementación completa del dominio **Restaurant** con todos los paradigmas asíncronos requeridos |

---

## 🏗️ Arquitectura del Sistema
El proyecto sigue una **Arquitectura en Capas**, aplicando **Clean Architecture** y **Domain-Driven Design**:

```
src/
├── domain/                 # 🎯 Capa de Dominio
│   ├── entities/           # Entidades del negocio
│   ├── interfaces/         # Contratos del dominio
│   └── value-objects/      # Objetos de valor
├── infrastructure/         # 🔧 Capa de Infraestructura
│   ├── repositories/       # Implementación de repositorios
│   └── data/               # Datos mock y persistencia
├── application/            # 📝 Capa de Aplicación
│   ├── services/           # Servicios de aplicación
│   └── use-cases/          # Casos de uso específicos
└── presentation/           # 🌐 Capa de Presentación
    └── server.ts           # Servidor principal
```

### 🏛️ Principios Aplicados
- **SOLID**: Responsabilidad Única, Abierto/Cerrado, Inversión de Dependencias  
- **Separation of Concerns**: cada capa con responsabilidades claras  
- **Dependency Injection**: bajo acoplamiento entre componentes  
- **Clean Architecture**: independencia de frameworks y bases de datos  

---

## ⚡ Paradigmas Asíncronos Implementados
Cada operación CRUD implementa un paradigma distinto:

| Operación | Paradigma     | Implementación |
|-----------|---------------|----------------|
| CREATE    | 📝 Callbacks  | callback(error, result) |
| READ      | 📋 Async/Await | funciones `async/await` con `try/catch` |
| UPDATE    | ✏️ Promises   | uso de `.then()` y `.catch()` |
| DELETE    | 🗑️ Async/Await | validación previa y retorno boolean |

---

## 🚀 Instrucciones de Instalación

### ✅ Prerrequisitos
- Node.js 18+  
- npm o yarn  
- Git  

### ⚙️ Pasos
```bash
# 1. Clonar repositorio
git clone https://github.com/odaliasengell/Practica_S_Web
cd Parcial1/Practica1/Practica2/catalogo-restaurantes

# 2. Instalar dependencias
npm install

# 3. Verificar instalación
npm run build
```

### 📦 Dependencias principales
```json
{
  "typescript": "^5.3.2",
  "express": "^4.18.2",
  "uuid": "^9.0.1",
  "cors": "^2.8.5",
  "ts-node": "^10.9.1"
}
```

---

## 🎮 Instrucciones de Ejecución
```bash
# Modo desarrollo
npm run dev

# Producción
npm start

# Compilar TypeScript
npm run build
```

---

## 📡 API REST - Endpoints Disponibles
**Base URL:** `http://localhost:3000/restaurants`

### 🔍 Endpoints Principales
| Método | Endpoint             | Paradigma    | Descripción |
|--------|----------------------|--------------|-------------|
| GET    | /restaurantes        | Async/Await  | Obtener todos los restaurantes |
| GET    | /restaurantes/:id    | Async/Await  | Obtener restaurante específico |
| POST   | /restaurantes        | Callbacks    | Crear nuevo restaurante |
| PUT    | /restaurantes/:id    | Promises     | Actualizar restaurante |
| DELETE | /restaurantes/:id    | Async/Await  | Eliminar restaurante |

### 🔎 Endpoints de Búsqueda
- **GET** `/restaurantes/abiertos` → Restaurantes abiertos actualmente  
- **GET** `/restaurantes/populares` → Restaurantes mejor calificados  
- **GET** `/restaurantes/estadisticas` → Estadísticas del catálogo  
- **GET** `/restaurantes/buscar/nombre/:nombre` → Buscar por nombre  
- **GET** `/restaurantes/buscar/cocina/:tipo` → Buscar por tipo de cocina  
- **PATCH** `/restaurantes/:id/estado` → Cambiar estado (abierto/cerrado)  

---

## 🧪 Pruebas con Thunder Client / Postman
### 📋 Colección de Pruebas
1. **GET** `/api/restaurantes` → Obtener todos los restaurantes  
2. **GET** `/api/restaurantes/1` → Obtener restaurante por ID  
3. **POST** `/api/restaurantes` → Crear restaurante (CALLBACKS)  
4. **PUT** `/api/restaurantes/1` → Actualizar restaurante (PROMISES)  
5. **DELETE** `/api/restaurantes/1` → Eliminar restaurante (ASYNC/AWAIT)  
6. **GET** `/api/restaurantes/abiertos` → Restaurantes abiertos  
7. **GET** `/api/restaurantes/estadisticas` → Estadísticas  

---

## 🛠️ Tecnologías Utilizadas
- **Backend Framework**: Node.js (v18+), Express.js, TypeScript  
- **Herramientas de Desarrollo**: ts-node, nodemon, UUID  
- **Arquitectura y Patrones**:  
  - Domain-Driven Design  
  - Clean Architecture  
  - Repository Pattern  
  - Principios SOLID  

---

## 🎯 Cumplimiento de Requisitos
✅ Arquitectura en 4 capas  
✅ Entidad `Restaurant` completa  
✅ CRUD con diferentes paradigmas asíncronos  
✅ Validaciones y manejo de errores  
✅ API REST lista para testing  
✅ README completo con evidencias  

---

## 👨‍💻 Conclusiones
- Comprensión de paradigmas asíncronos: **callbacks, promises y async/await**  
- Beneficios de **arquitectura en capas** y **DDD** para claridad y mantenibilidad  
- Uso de **TypeScript** para prevenir errores en tiempo de compilación  
- Bases sólidas para extender el proyecto con autenticación, base de datos real y microservicios  

---
