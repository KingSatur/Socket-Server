import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { listaUsuarios } from '../sockets/sockets';

export const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'Todo esta bien',
  });
});

// Servicio para todos los usuarios
router.get('/usuarios', (req: Request, res: Response) => {
  // Obtengo la instancia de mi servidor y luego el socket general
  const server = Server.instance;

  server.io.clients((err: any, clientes: any[]) => {
    if (err) {
      res.json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      clientes,
    });
  });
});

// Obtener usuarios y nombre
router.get('/usuarios/detalle', (req: Request, res: Response) => {
  res.json({
    ok: true,
    clientes: listaUsuarios.getList(),
  });
});

router.post('/mensajes', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const server = Server.instance;

  const payload = {
    de,
    cuerpo,
  };

  server.io.emit('mensaje-nuevo', payload);

  res.json({
    ok: true,
    de,
    cuerpo,
  });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  const payload = {
    de,
    cuerpo,
  };

  const server = Server.instance;

  server.io.to(id).emit('mensaje-privado', payload);

  res.json({
    ok: true,
    de,
    cuerpo,
    id,
  });
});
