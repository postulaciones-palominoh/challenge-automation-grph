```md
# 🔍 Reto de Automatización Monnet – Playwright + TypeScript 

Este proyecto resuelve el challenge propuesto, implementando pruebas automatizadas sobre APIs públicas y una interfaz web (Wikipedia), con enfoque profesional, seguro y escalable.

---

## 🧠 Arquitectura técnica

- ⚙️ **Playwright** como framework de pruebas automatizadas
- 🧪 **Fixtures personalizados** para manejar la clave secreta encriptada
- 🔐 **SHA256 + `.env`** para una gestión segura de datos sensibles
- 📁 **Lectura directa del archivo Excel** (`Datos-pruebas.xlsx`) usando `xlsx`
- 📦 **Page Object Model (POM)** para desacoplar la automatización web
- 📂 **Logger centralizado** (`logs/`) para registrar eventos y errores
- 🖼️ **Descarga y validación de imágenes** (extensión y peso)
- 📸 **Captura automática de pantallas + video en fallos**
- 📊 **Reporte HTML interactivo** de resultados

---

## 📁 Estructura del proyecto

```
automation-challenge/
├── data/                 # Archivo de datos Excel
├── fixtures/             # Fixture para clave secreta
├── pages/                # Page Object (Wikipedia)
├── tests/                # Pruebas API y Web
├── utils/                # Utilidades (Excel, log, imágenes)
├── images/               # Imágenes descargadas de Wikipedia
├── logs/                 # Registros de ejecución
├── .env                  # Clave secreta (fuera del control de versiones)
├── playwright.config.ts  # Configuración global
└── README.md
```

---

## 🚀 Instrucciones de ejecución

### 1. Clonar e instalar dependencias
```bash
git clone https://github.com/postulaciones-palominoh/challenge-automation-grph.git
cd automation-challenge
npm install
npx playwright install
```

### 2. Crear archivo `.env`
```env
SECRET_KEY="Coloca tu Clave"
```
O Copia y renombra el archivo ejemplo.env a .env y coloca la clave de autenticación asignada

### 3. Ejecutar todas las pruebas
```bash
npm test
```

### 4. Visualizar el reporte de ejecución
```bash
npm run report
```

---

## ✅ Checklist de cumplimiento

| Requisito | Cumplido |
|-----------|----------|
| Proyecto único que agrupa pruebas API + Web | ✅ |
| Lectura directa desde `.xlsx` sin conversión a JSON | ✅ |
| Clave encriptada con SHA256 y gestionada por `.env` | ✅ |
| Uso de `fixtures` en lugar de `beforeEach` | ✅ |
| Logs en consola y archivos (`logs/`) con timestamps | ✅ |
| Validaciones: `id`, `name`, `abilities`, tiempo de respuesta | ✅ |
| Reporte HTML generado con evidencia por test | ✅ |
| Estructura escalable con separación por capas | ✅ |
| Capturas y videos en fallos automáticos | ✅ |
| Validación de tipo y peso de imágenes | ✅ |
| Uso del patrón Page Object Model (POM) | ✅ |
| README claro y ejecutable incluido | ✅ |

---

## 🧪 Pruebas realizadas

### API – `GET` Pokémon
- Realiza consultas por ID y nombre desde archivo Excel
- Valida estructura y tiempo de respuesta
- Loguea la clave secreta encriptada y hora

### API – `POST` jsonplaceholder
- Envía payload de prueba
- Valida código 201 y existencia de campo `id`
- Loguea clave y fecha de ejecución

### Web – Wikipedia
- Ingresa a `https://en.wikipedia.org/wiki/{pokemon}`
- Valida título de página
- Extrae autor del dibujo
- Descarga imagen del Pokémon
- Valida tipo de archivo (.jpg/.png/.svg) y que pese menos de 500KB

---

## 📂 Evidencias generadas

- 📄 `logs/`: eventos y errores por ejecución
- 📷 Capturas automáticas al fallar un test
- 🎥 Videos de ejecución fallida
- 📁 `images/`: imágenes extraídas de Wikipedia

---

> 🗣️ _“Este proyecto no solo resuelve técnicamente el challenge, sino que refleja buenas prácticas, seguridad y escalabilidad para un equipo de automatización moderno.”_

```

---