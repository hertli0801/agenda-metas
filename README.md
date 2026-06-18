# 📋 Agenda de Metas

Una aplicación **full-stack** para gestionar objetivos personales con autenticación de usuarios, creación de metas y seguimiento de progreso.

## 🚀 Características

✅ **Autenticación de Usuarios**
- Registro e inicio de sesión con contraseñas encriptadas (bcryptjs)
- Validación de credenciales segura

✅ **Gestión de Metas**
- Crear, actualizar y eliminar metas personales
- Organización por usuario
- Seguimiento de progreso en tiempo real

✅ **Dashboard de Progreso**
- Visualización del progreso general de metas
- Estadísticas por usuario

✅ **API RESTful**
- Endpoints documentados y escalables
- Manejo de errores robusto

## 🛠️ Stack Tecnológico

### Frontend
- **React 18.3.1** - Librería UI
- **Vite 6.0.1** - Build tool ultra rápido
- **Tailwind CSS 3.4.15** - Estilos utilities-first
- **Axios 1.18.0** - Cliente HTTP

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js 5.2.1** - Framework web
- **MySQL2 3.22.5** - Base de datos relacional
- **bcryptjs 3.0.3** - Encriptación de contraseñas
- **CORS 2.8.6** - Control de solicitudes entre dominios
- **dotenv 17.4.2** - Gestión de variables de entorno

### DevTools
- **Vite** - Development server con HMR
- **Nodemon 3.1.4** - Auto-reload para backend
- **ESLint** - Linting de código
- **TailwindCSS Vite** - Integración optimizada

## 📁 Estructura del Proyecto

```
agenda-metas/
├── frontend/                 # Aplicación React + Vite
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                  # Servidor Express
│   ├── config/
│   │   └── db.js            # Configuración MySQL
│   ├── routes/
│   │   ├── authRoutes.js    # Rutas de autenticación
│   │   └── metaRoutes.js    # Rutas de metas
│   ├── controllers/
│   ├── index.js             # Punto de entrada
│   └── package.json
│
├── database/                # Scripts SQL
├── vercel.json             # Config deployments
└── tailwind.config.js      # Config Tailwind
```

## 🔧 Instalación y Configuración

### Requisitos Previos
- **Node.js** v18+
- **MySQL** 8.0+
- **npm** o **yarn**

### 1. Clonar el repositorio
```bash
git clone https://github.com/hertli0801/agenda-metas.git
cd agenda-metas
```

### 2. Configurar Backend
```bash
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
cat > .env << EOF
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=db_agenda_metas
NODE_ENV=development
EOF

# Iniciar servidor
npm run dev
```

### 3. Configurar Frontend
```bash
cd ../frontend

# Instalar dependencias
npm install

# Crear archivo .env (si es necesario)
cat > .env << EOF
VITE_API_URL=http://localhost:3000
EOF

# Iniciar aplicación
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📡 API Endpoints

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Registrar nuevo usuario |
| `POST` | `/api/auth/login` | Iniciar sesión |

### Metas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/meta` | Obtener todas las metas |
| `POST` | `/api/meta` | Crear nueva meta |
| `PUT` | `/api/meta/:id` | Actualizar meta |
| `DELETE` | `/api/meta/:id` | Eliminar meta |
| `GET` | `/api/meta/progreso/:usuarioId` | Obtener progreso del usuario |

### Ejemplo de Registro
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "contraseña123",
    "nombre": "Juan"
  }'
```

### Ejemplo de Crear Meta
```bash
curl -X POST http://localhost:3000/api/meta \
  -H "Content-Type: application/json" \
  -d '{
    "usuarioId": 1,
    "titulo": "Aprender React",
    "descripcion": "Completar el curso",
    "fecha_limite": "2026-12-31"
  }'
```

## 🚀 Deployment

### Opción 1: Vercel + Railway (Recomendado)

#### Frontend en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Importa tu repositorio GitHub
3. Configura:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Agrega variable de entorno:
   ```
   VITE_API_URL=https://tu-backend.railway.app
   ```

#### Backend en Railway
1. Ve a [railway.app](https://railway.app)
2. Conecta tu repositorio GitHub
3. Configura:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
4. Agrega variables de entorno:
   ```
   PORT=3000
   DB_HOST=tu-host-mysql
   DB_USER=usuario
   DB_PASSWORD=contraseña
   DB_NAME=db_agenda_metas
   NODE_ENV=production
   ```

### Opción 2: Render + PlanetScale

**Backend en Render:**
- Service Type: Web Service
- Build Command: `npm install`
- Start Command: `node backend/index.js`

**Database en PlanetScale:**
- Crea un cluster MySQL gratis
- Obtén la connection string
- Configura como `DATABASE_URL`

### Opción 3: Docker (Local/Self-hosted)

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY backend package.json .
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
```

## 📊 Base de Datos

### Tablas Principales
```sql
-- Usuarios
CREATE TABLE Usuario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  nombre VARCHAR(255),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Metas
CREATE TABLE Meta (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuarioId INT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  fecha_limite DATE,
  estado ENUM('pendiente', 'en_progreso', 'completada'),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuarioId) REFERENCES Usuario(id) ON DELETE CASCADE
);
```

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run lint       # Verificar código
npm run dev        # Dev server con HMR
npm run build      # Build producción
npm run preview    # Preview de producción
```

### Backend
```bash
cd backend
npm run dev        # Dev server con auto-reload
npm start          # Producción
```

## 🐛 Troubleshooting

### Error: "Cannot find module 'mysql2'"
```bash
cd backend
npm install mysql2
```

### Error: "CORS policy: No 'Access-Control-Allow-Origin'"
- Verifica que CORS esté habilitado en `backend/index.js`
- Configura la URL del frontend en variables de entorno

### Error: "Connection refused to MySQL"
- Verifica que MySQL esté corriendo
- Comprueba credenciales en `.env`
- Asegúrate de que la base de datos existe

### Frontend no conecta al backend
- Verifica `VITE_API_URL` apunta a la URL correcta
- Comprueba CORS en backend
- Abre DevTools (F12) → Network para ver errores

## 📝 Licencia

Este proyecto es de código abierto. Siéntete libre de usarlo, modificarlo y distribuirlo.

## 👤 Autor

**Hernán Lizárraga Castillo**
- GitHub: [@hertli0801](https://github.com/hertli0801)
- Email: contact@example.com

## 🙏 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## ⭐ Soporte

Si te gusta este proyecto, ¡dame una ⭐ en GitHub!

---

**Última actualización**: Junio 2026
