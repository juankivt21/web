const fs = require("fs-extra")
const path = require("path")

// Directorio de salida de Next.js
const outDir = path.join(__dirname, "..", "out")

console.log("Ajustando permisos para archivos estáticos...")

// Función recursiva para establecer permisos
async function setPermissions(directory) {
  try {
    const items = await fs.readdir(directory)

    for (const item of items) {
      const itemPath = path.join(directory, item)
      const stats = await fs.stat(itemPath)

      if (stats.isDirectory()) {
        // Establecer permisos para directorios (755 - rwxr-xr-x)
        await fs.chmod(itemPath, 0o755)
        console.log(`Directorio: ${itemPath} - permisos establecidos a 755`)

        // Procesar subdirectorios recursivamente
        await setPermissions(itemPath)
      } else {
        // Establecer permisos para archivos (644 - rw-r--r--)
        await fs.chmod(itemPath, 0o644)
        console.log(`Archivo: ${itemPath} - permisos establecidos a 644`)
      }
    }
  } catch (error) {
    console.error(`Error al establecer permisos: ${error.message}`)
  }
}

// Verificar si el directorio existe
fs.access(outDir)
  .then(() => {
    // Copiar .htaccess al directorio de salida
    const htaccessSrc = path.join(__dirname, "..", "public", ".htaccess")
    const htaccessDest = path.join(outDir, ".htaccess")

    return fs
      .copy(htaccessSrc, htaccessDest)
      .then(() => {
        console.log(".htaccess copiado al directorio de salida")
        return fs.chmod(htaccessDest, 0o644)
      })
      .then(() => {
        console.log("Permisos de .htaccess establecidos a 644")
        return setPermissions(outDir)
      })
  })
  .then(() => {
    console.log("Proceso completado con éxito")
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`)
  })

