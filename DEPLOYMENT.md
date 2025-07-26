# Guía de Despliegue - Área de Miembros Hara Hachi Bu

## Error 404 / Problemas de Hosting

Si estás viendo un error 404 o contenido HTML crudo cuando accedes a la aplicación, sigue estos pasos:

### Paso 1: Construir la Aplicación Correctamente

```bash
# Construir la aplicación
npm run build

# Copiar archivos PDF al directorio de construcción
cp -r client/public/pdfs dist/public/pdfs
```

### Paso 2: Configurar el Servidor Web

La aplicación requiere configuración especial para Single Page Application (SPA). 

**Para Apache (.htaccess):**
```apache
RewriteEngine On
RewriteRule ^api/ - [L]
RewriteRule ^pdfs/ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**Para Nginx:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}

location /api/ {
    # Proxy para API si es necesario
}

location /pdfs/ {
    # Servir archivos PDF directamente
}
```

**Para Node.js/Express (recomendado):**
```bash
NODE_ENV=production npm start
```

### Paso 3: Verificar Archivos Requeridos

Asegúrate de que estos archivos estén presentes después de la construcción:
- `dist/public/index.html` - Aplicación principal
- `dist/public/pdfs/` - Directorio con todos los PDFs
- `dist/index.js` - Servidor de producción

### Estructura de Archivos PDF Requerida:
```
dist/public/pdfs/
├── ebook-introducion_1753492157346.pdf
├── Capitulo-1_1753492157346.pdf
├── capitulo-2_1753492157346.pdf
├── capitulo-3_1753492157345.pdf
├── capitulo-4_1753492157345.pdf
├── capitulo-5_1753492157345.pdf
├── bono-1_1753492157344.pdf
├── bono-2_1753492157344.pdf
└── bono-3_1753492157338.pdf
```

### Paso 4: Configurar Variables de Entorno

```bash
NODE_ENV=production
PORT=5000
```

### Solución de Problemas

1. **Error 404 en login:** El servidor no está configurado como SPA
2. **PDFs no descargan:** Faltan archivos en `/pdfs/`
3. **Contenido HTML crudo:** Problema de configuración del servidor web
4. **Rutas no funcionan:** Falta configuración de fallback a index.html

### Credenciales de Acceso
- **Usuario:** Cualquier nombre de usuario
- **Contraseña:** `MJP-HHB1`