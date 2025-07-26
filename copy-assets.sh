#!/bin/bash

echo "📄 Copiando archivos PDF para despliegue..."

# Crear directorio de destino si no existe
mkdir -p dist/public/pdfs

# Copiar archivos PDF desde client/public/pdfs a dist/public/pdfs
if [ -d "client/public/pdfs" ]; then
    cp -r client/public/pdfs/* dist/public/pdfs/
    echo "✅ Archivos PDF copiados exitosamente"
    echo "📁 Archivos disponibles:"
    ls -la dist/public/pdfs/
else
    echo "❌ Error: No se encontró el directorio client/public/pdfs"
    echo "Asegúrate de que los archivos PDF estén en la ubicación correcta"
fi

# Verificar que los archivos requeridos estén presentes
echo "🔍 Verificando archivos requeridos..."

required_files=(
    "ebook-introducion_1753492157346.pdf"
    "Capitulo-1_1753492157346.pdf"
    "capitulo-2_1753492157346.pdf"
    "capitulo-3_1753492157345.pdf"
    "capitulo-4_1753492157345.pdf"
    "capitulo-5_1753492157345.pdf"
    "bono-1_1753492157344.pdf"
    "bono-2_1753492157344.pdf"
    "bono-3_1753492157338.pdf"
)

missing_files=0
for file in "${required_files[@]}"; do
    if [ ! -f "dist/public/pdfs/$file" ]; then
        echo "❌ Falta: $file"
        missing_files=$((missing_files + 1))
    else
        echo "✅ Encontrado: $file"
    fi
done

if [ $missing_files -eq 0 ]; then
    echo "🎉 Todos los archivos PDF están presentes y listos para el despliegue"
else
    echo "⚠️  Faltan $missing_files archivos. Revisa la configuración antes del despliegue."
fi