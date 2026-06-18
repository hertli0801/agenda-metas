# 🚀 Guía de Deployment en Render

Esta guía te mostrará cómo deployar **Agenda de Metas** en **Render** de forma gratuita.

## 📋 Requisitos

- Cuenta en [Render.com](https://render.com) (registrate con GitHub)
- Repositorio en GitHub (ya lo tienes)
- Base de datos MySQL (usaremos PlanetScale gratis)

---

## 🗄️ Paso 1: Crear Base de Datos en PlanetScale

### 1.1 Registrarse en PlanetScale
1. Ve a [planetscale.com](https://planetscale.com)
2. Haz clic en **Sign Up** → **Sign up with GitHub**
3. Autoriza PlanetScale

### 1.2 Crear tu primer database
1. Click en **Create a database**
2. Nombre: `agenda-metas`
3. Region: Selecciona la más cercana a ti
4. Haz click en **Create database**

### 1.3 Obtener la Connection String
1. Una vez creada, ve a **Connect**
2. Selecciona **Node.js** en el dropdown
3. Copia la connection string (algo como):
```
mysql://[username]:[password]@[host]/[database]?sslaccept=strict
```

### 1.4 Crear password
1. En la misma sección, haz click en **Create password**
2. Dale un nombre (ej: `render-deploy`)
3. Copia la nueva connection string (reemplaza el password anterior)

**⚠️ Guarda esta string en un lugar seguro - la necesitarás próximamente**

---

## 🔧 Paso 2: Preparar el Backend para Render

### 2.1 Crear archivo render.yaml
En la raíz de tu proyecto (`agenda-metas/`), crea un archivo llamado `render.yaml`:

```yaml
services:
  - type: web
    name: agenda-metas-backend
    runtime: node
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
      - key: DB_HOST
        fromDatabase:
          name: agenda-metas-db
          property: host
      - key: DB_USER
        fromDatabase:
          name: agenda-metas-db
          property: user
      - key: DB_PASSWORD
        fromDatabase:
          name: agenda-metas-db
          property: password
      - key: DB_NAME
        fromDatabase:
          name: agenda-metas-db
          property: database

databases:
  - name: agenda-metas-db
    databaseName: agenda_metas
    user: planetscale_user
    plan: free
```

### 2.2 Actualizar backend/package.json (si es necesario)
Asegúrate de que el script `start` esté definido:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

---

## 🌐 Paso 3: Deployar Backend en Render

### 3.1 Ir a Render Dashboard
1. Ve a [dashboard.render.com](https://dashboard.render.com)
2. Haz click en **New +** → **Web Service**
3. Selecciona **Deploy an existing repository**
4. Si no ves tu repo, haz click en **Configure account** → conecta GitHub

### 3.2 Configurar el servicio
1. Selecciona `hertli0801/agenda-metas`
2. **Name**: `agenda-metas-backend`
3. **Root Directory**: `backend`
4. **Environment**: `Node`
5. **Build Command**: `npm install`
6. **Start Command**: `npm start`
7. **Plan**: `Free`

### 3.3 Variables de Entorno
Haz click en **Advanced** y agrega estas variables:

| Key | Value |
|-----|-------|
| `PORT` | `3000` |
| `NODE_ENV` | `production` |
| `DB_HOST` | Tu host de PlanetScale |
| `DB_USER` | Tu usuario de PlanetScale |
| `DB_PASSWORD` | Tu password de PlanetScale |
| `DB_NAME` | `agenda_metas` |

**Obtén estos valores de tu connection string de PlanetScale:**
```
mysql://[DB_USER]:[DB_PASSWORD]@[DB_HOST]/[DB_NAME]?sslaccept=strict
```

### 3.4 Crear servicio
Haz click en **Create Web Service**

**⏳ El deploy tomará 2-5 minutos. Verás logs en vivo.**

### 3.5 Verificar que funciona
Una vez deployado, obtendrás una URL como:
```
https://agenda-metas-backend.onrender.com
```

Pruébala:
```bash
curl https://agenda-metas-backend.onrender.com/
# Deberías ver: ¡Servidor de la Agenda de Metas corriendo con éxito!
```

---

## 🎨 Paso 4: Deployar Frontend en Vercel

### 4.1 Ir a Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Haz click en **Add New +** → **Project**
3. Importa tu repositorio `agenda-metas`

### 4.2 Configurar Frontend
1. **Framework Preset**: `Vite`
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### 4.3 Variables de Entorno
Agrega esta variable en **Environment Variables**:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://agenda-metas-backend.onrender.com` |

### 4.4 Deploy
Haz click en **Deploy**

⏳ El deploy tomará 1-2 minutos.

Una vez completado, obtendrás una URL como:
```
https://agenda-metas.vercel.app
```

---

## ✅ Verificar que todo funciona

### Prueba el registro
```bash
curl -X POST https://agenda-metas-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "nombre": "Test User"
  }'
```

### Prueba el login
```bash
curl -X POST https://agenda-metas-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Accede a la aplicación
Abre en tu navegador:
```
https://agenda-metas.vercel.app
```

---

## 🔄 Actualizar la aplicación

Cada vez que hagas push a `main`:

1. **Backend** se actualiza automáticamente en Render
2. **Frontend** se actualiza automáticamente en Vercel

No necesitas hacer nada más, es completamente automático.

---

## 🐛 Solucionar Problemas

### Error: "Cannot connect to database"
- Verifica que la connection string sea correcta en variables de entorno
- Comprueba que PlanetScale esté activo
- Intenta crear un nuevo password en PlanetScale

### Error: "CORS policy rejected"
- Asegúrate de que `VITE_API_URL` en Vercel apunta a tu URL de Render
- Verifica que CORS esté habilitado en `backend/index.js`

### El backend tarda mucho en arrancar
- Los free plans de Render se "duermen" después de 15 min de inactividad
- Primer request tomará más tiempo (5-30 seg)
- Esto es normal

### Logs de error en Render
1. Ve a tu servicio en Render dashboard
2. Abre la pestaña **Logs**
3. Desplázate para ver los errores completos

---

## 💡 Tips Pro

### Escalar a Plan Pago
Si tu app crece:
1. En Render dashboard, abre tu servicio
2. Haz click en **Settings** → **Plan**
3. Selecciona un plan pago ($7/mes)

### Custom Domain
1. En Render dashboard → **Settings** → **Custom Domain**
2. Apunta tu dominio a Render
3. El SSL se configura automáticamente

### Environment Variables Secretas
Para información sensible:
1. En **Environment** abre un editor de secrets
2. Las variables secretas no aparecen en logs
3. Úsalas para API keys, passwords, etc.

---

## 🎉 ¡Listo!

Tu aplicación está **deployada y en vivo**. 

**URLs:**
- 🌐 Frontend: `https://agenda-metas.vercel.app`
- 🔧 Backend: `https://agenda-metas-backend.onrender.com`
- 🗄️ Database: PlanetScale (privada)

**Próximos pasos:**
1. Prueba la aplicación en navegador
2. Invita a amigos a probarla
3. Haz push de cambios para ver actualizaciones automáticas
4. Monitorea logs en Render si hay problemas

---

**¿Necesitas ayuda?** Checa los logs en Render o Vercel para más detalles sobre errores.
