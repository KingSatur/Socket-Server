import Server from './classes/server';
import { router } from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const nombre = 'Juanqwerqwer';

console.log(nombre);
const pelota = 12;
const server = new Server();

server.app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.app.use(bodyParser.json());

// Configuracion CORS para otras aplicaciones puedan acceder a nuestros servicios
server.app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Rutas de servicio
server.app.use('/', router);

server.start(() => {
  console.log(`El server esta en ${server.port}`);
});
