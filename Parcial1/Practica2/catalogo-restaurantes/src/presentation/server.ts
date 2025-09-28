import express from "express";
import cors from "cors";
import { RestaurantRepository } from "../infrastructure/repositories/RestaurantRepository.js";
import { RestaurantService } from "../application/services/RestaurantService.js";

// Importar casos de uso
import { CreateRestaurantUseCase } from "../application/use-cases/CreateRestaurantUseCase.js";
import { UpdateRestaurantUseCase } from "../application/use-cases/UpdateRestaurantUseCase.js";
import { DeleteRestaurantUseCase } from "../application/use-cases/DeleteRestaurantUseCase.js";
import { GetRestaurantByIdUseCase } from "../application/use-cases/GetRestaurantByIdUseCase.js";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dependencias
const repository = new RestaurantRepository();
const service = new RestaurantService(repository);

// Instanciar casos de uso
const createRestaurantUC = new CreateRestaurantUseCase(service);
const updateRestaurantUC = new UpdateRestaurantUseCase(service);
const deleteRestaurantUC = new DeleteRestaurantUseCase(service);
const getRestaurantByIdUC = new GetRestaurantByIdUseCase(service);

// Rutas simples de prueba
app.get("/", (_req, res) => {
  res.send("🚀 API de Restaurantes funcionando con TypeScript + Express");
});

app.get("/restaurants", async (_req, res) => {
  const restaurants = await service.getAllRestaurants();
  res.json(restaurants);
});

// Obtener restaurante por ID
app.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await getRestaurantByIdUC.execute(req.params.id);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: "Restaurante no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno" });
  }
});

// Crear restaurante
app.post("/restaurants", async (req, res) => {
  try {
    const created = await createRestaurantUC.executeAsync(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: "No se pudo crear el restaurante" });
  }
});

// Actualizar restaurante
app.put("/restaurants/:id", async (req, res) => {
  try {
    const updated = await updateRestaurantUC.execute(req.params.id, req.body);
    
    if (updated) {
      res.status(200).json({
        message: "Restaurante actualizado exitosamente",
        data: updated
      });
    } else {
      res.status(404).json({ error: "Restaurante no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar restaurante:", error);
    res.status(500).json({ 
      error: "Error interno al actualizar el restaurante",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Eliminar restaurante
app.delete("/restaurants/:id", async (req, res) => {
  try {
    const deleted = await deleteRestaurantUC.execute(req.params.id);
    if (deleted) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Restaurante no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar el restaurante" });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});