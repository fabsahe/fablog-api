import { consola } from 'consola'
import { PORT } from './config/config.js'
import app from './app.js'

app.listen(PORT, function () {
  consola.success(`Servidor listo en: http://localhost:${PORT}`)
})
