-- Schema SQL generado para Taller TypeORM (Guia, Tour, Reserva)
CREATE TABLE guia (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT,
  activo INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE tour (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  precio REAL NOT NULL,
  fecha DATETIME,
  guia_id INTEGER NOT NULL,
  FOREIGN KEY (guia_id) REFERENCES guia(id) ON DELETE RESTRICT
);

CREATE TABLE reserva (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_nombre TEXT NOT NULL,
  cliente_email TEXT NOT NULL,
  cantidad_personas INTEGER NOT NULL,
  fecha_reserva DATETIME NOT NULL,
  tour_id INTEGER NOT NULL,
  FOREIGN KEY (tour_id) REFERENCES tour(id) ON DELETE CASCADE
);
