# **TeLlevoDuoc**

### **Descripción del Proyecto**
**TeLlevoDuoc** es una aplicación creada con Ionic Angular para gestionar viajes compartidos entre usuarios. 
Permite registrar, buscar, y gestionar viajes, además de funcionalidades como recuperación de contraseñas y calificación de viajes realizados.

---

### **Características Principales**
- **Buscar viajes:** Los usuarios pueden buscar viajes disponibles basados en lugar de encuentro y destino.
- **Registrar viajes:** Los conductores pueden registrar nuevos viajes, especificando capacidad, costo y otros detalles.
- **Gestión de viajes activos e historial:** Los usuarios pueden completar o cancelar viajes activos y revisar su historial de viajes.
- **Recuperar contraseña:** Función para recuperar contraseñas enviando un correo al usuario.
- **Responsive y amigable:** Compatible con dispositivos móviles y navegadores modernos.
- **Integración de mapas:** Uso de Leaflet para mostrar ubicaciones, lugares de encuentro y destinos.

---

### **Tecnologías Utilizadas**
- **Frontend:**
  - Ionic Angular
  - Leaflet (integración de mapas)
  - EmailJS (envío de correos)
- **Backend:**
  - Simulación usando LocalStorage para almacenar datos de usuarios y viajes.

---

### **Funcionalidades Detalladas**
1. **Página principal (Buscar Viajes):**
   - Muestra un mapa interactivo con los lugares de encuentro, destinos y la ubicación actual del usuario.
   - Los viajes completos no se muestran como disponibles.
   - Scroll automático y resaltado del viaje correspondiente al seleccionar un marcador.

2. **Registro de viajes:**
   - Permite a los conductores registrar un nuevo viaje con detalles como destino, lugar de encuentro, capacidad, costo y fecha.

3. **Mis viajes:**
   - Gestiona los viajes activos (completar o cancelar).
   - Muestra un historial de viajes completados.
   - Opciones para eliminar viajes del historial.

4. **Recuperación de contraseña:**
   - Verifica que el correo existe en LocalStorage antes de enviar el correo de recuperación.
   - Usa un token codificado en el enlace de recuperación.

---

### **Instrucciones de Configuración**

#### **Requisitos Previos**
- Node.js (v16 o superior recomendado)
- Ionic CLI

#### **Instalación**
1. Clona este repositorio:
   ```bash
   https://github.com/Benyuminalvarado/pagina-web-uber.git
   cd te-llevo-duoc
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   ionic serve
   ```

4. Abre en el navegador:
   - Local: [http://localhost:8100](http://localhost:8100)

---

### **Despliegue en Netlify**
La aplicación está desplegada en **Netlify**. Puedes acceder a ella en la siguiente URL:
[**https://ubiquitous-puffpuff-fae0d9.netlify.app/buscar-viaje**](https://ubiquitous-puffpuff-fae0d9.netlify.app/buscar-viaje)

---

### **Estructura del Proyecto**
```
src/
├── app/
│   ├── buscar-viaje/
│   ├── mis-viajes/
│   ├── registrar-viaje/
│   ├── recover-password/
│   └── shared/
├── assets/
│   └── icon/
├── environments/
│   ├── environment.prod.ts
│   └── environment.ts
├── global.scss
└── index.html
```

---

### **Pruebas**
1. **Simula la recuperación de contraseña:**
   - Asegúrate de que el correo ingresado esté registrado.
   - Verifica que el correo de recuperación sea enviado con un enlace válido.

2. **Registra un viaje y verifica:**
   - Asegúrate de que el viaje esté disponible en la lista de búsqueda.
   - Prueba completarlo o cancelarlo.

3. **Interacción del mapa:**
   - Prueba el scroll automático y resaltado al seleccionar un marcador.

---

### **Contribución**
Este proyecto está abierto a contribuciones. Si deseas colaborar, realiza un fork del repositorio, realiza tus cambios y crea un pull request.

---

### **Licencia**
Este proyecto está bajo la Licencia MIT.

---
