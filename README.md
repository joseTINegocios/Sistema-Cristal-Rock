# Sistema Cristal Rock — Gestor de Catálogos desde InDesign

Sistema para procesar archivos **IDML/INDD** de Adobe InDesign, extraer componentes, variables y precios, y sincronizar los datos con bases de datos, archivos Excel y APIs externas.

## Flujo de trabajo

1. **Subir archivo IDML/INDD** — El diseño maestro de InDesign se procesa y se analiza su estructura
2. **Extracción automática** — El sistema detecta variables (`{{price}}`, `{{sku}}`, `{{product_name}}`, etc.), componentes reutilizables y muestras de color
3. **Mapeo de datos** — Las variables extraídas se vinculan a campos de bases de datos, archivos Excel o APIs externas
4. **Sincronización** — Los datos se mantienen actualizados desde las fuentes conectadas (PostgreSQL, SAP, Excel, APIs REST)
5. **Vista previa** — Se renderiza el catálogo con los datos sincronizados para verificar que todo coincida
6. **Exportación** — Se compila el catálogo final como PDF listo para impresión

## Tecnología

- React + TypeScript + Vite
- Tailwind CSS
- Google Gemini AI (generación de activos y mapeo inteligente)
- GitHub Pages (despliegue)

## Ejecutar localmente

```bash
npm install
npm run dev
```
