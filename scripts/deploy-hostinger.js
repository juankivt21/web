const fs = require("fs-extra")
const path = require("path")
const { execSync } = require("child_process")

// Configuración
const outDir = path.join(__dirname, "..", "out")
const publicDir = path.join(__dirname, "..", "public")

// Función para ejecutar comandos
function runCommand(command) {
  console.log(`Ejecutando: ${command}`)
  try {
    execSync(command, { stdio: "inherit" })
  } catch (error) {
    console.error(`Error al ejecutar comando: ${error.message}`)
    process.exit(1)
  }
}

// Función para establecer permisos
async function setPermissions(directory) {
  try {
    const items = await fs.readdir(directory)

    for (const item of items) {
      const itemPath = path.join(directory, item)
      const stats = await fs.stat(itemPath)

      if (stats.isDirectory()) {
        // Permisos para directorios: 755 (rwxr-xr-x)
        await fs.chmod(itemPath, 0o755)
        console.log(`✓ Directorio: ${path.relative(outDir, itemPath)} - permisos 755`)
        await setPermissions(itemPath)
      } else {
        // Permisos para archivos: 644 (rw-r--r--)
        await fs.chmod(itemPath, 0o644)
        console.log(`✓ Archivo: ${path.relative(outDir, itemPath)} - permisos 644`)
      }
    }
  } catch (error) {
    console.error(`Error al establecer permisos: ${error.message}`)
    process.exit(1)
  }
}

// Función principal
async function main() {
  try {
    console.log("🚀 Iniciando preparación para Hostinger...")

    // Limpiar directorio de salida
    console.log("🧹 Limpiando directorio anterior...")
    await fs.remove(outDir)

    // Construir el proyecto
    console.log("🔨 Construyendo el proyecto...")
    runCommand("next build")

    // Copiar index.php a la carpeta de salida
    console.log("📄 Copiando archivos de configuración...")
    const phpSrc = path.join(publicDir, "index.php")
    const phpDest = path.join(outDir, "index.php")
    await fs.copy(phpSrc, phpDest)

    // Eliminar .htaccess si existe para evitar conflictos
    const htaccessPath = path.join(outDir, ".htaccess")
    if (await fs.pathExists(htaccessPath)) {
      await fs.remove(htaccessPath)
      console.log("✓ Archivo .htaccess eliminado para evitar conflictos")
    }

    // Establecer permisos correctos
    console.log("🔒 Estableciendo permisos correctos...")
    await setPermissions(outDir)

    // Establecer permisos específicos para index.php
    await fs.chmod(phpDest, 0o644)
    console.log(`✓ Archivo: index.php - permisos 644`)

    console.log("\n✅ Preparación completada con éxito!")
    console.log('\n📦 Ahora puedes subir todo el contenido de la carpeta "out" a la raíz de tu hosting en Hostinger.')
    console.log("🔑 IMPORTANTE: Asegúrate de que PHP esté habilitado en tu hosting (debería estarlo por defecto).")
  } catch (error) {
    console.error(`❌ Error durante la preparación: ${error.message}`)
    process.exit(1)
  }
}

// Ejecutar función principal
main()

