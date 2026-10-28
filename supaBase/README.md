# Challenge A - Supabase

Aplicación Angular para registrar usuarios, iniciar sesión y administrar tareas privadas con Supabase. Incluye actualizaciones en tiempo real y carga de avatares en Storage.

## 1. Preparar Supabase

1. Crea o abre el proyecto de Supabase.
2. En **SQL Editor**, ejecuta completo [`supabase/setup.sql`](supabase/setup.sql). El script crea `public.tareas`, habilita RLS con políticas por usuario, crea el bucket privado `avatars`, agrega sus políticas y publica `tareas` para Realtime.
3. En **Authentication > Sign In / Providers**, habilita Email. Si confirmas correos, los usuarios deben confirmar antes de iniciar sesión; para desarrollo puedes desactivar la confirmación.
4. En **Authentication > URL Configuration**, agrega `http://localhost:4200` como URL local.
5. Comprueba que la URL del proyecto y su clave **Publishable** estén configuradas en `src/environments/environment.ts`. Solo se usa la clave publicable en el frontend; nunca pongas una clave `secret` o `service_role` allí.

## 2. Ejecutar

Desde esta carpeta (`supaBase`):

```bash
npm install
npm start
```

Abre `http://localhost:4200`. Crea una cuenta, inicia sesión y usa la lista para crear, editar, completar y eliminar tareas. La lista se vuelve a cargar cuando Realtime recibe cambios. La foto se guarda en `avatars` y su ruta se conserva en los metadatos del usuario para volver a mostrarla al entrar.

## Estructura

- `src/app/services`: clientes y operaciones de Supabase Auth, tareas y Storage.
- `src/app/guards` y `src/app/app.routes.ts`: protección de la ruta privada.
- `src/app/componentes`: pantallas de registro, login y tareas.
- `supabase/setup.sql`: esquema, seguridad y configuración de Storage y Realtime.

Si la aplicación informa de errores de permisos, vuelve a ejecutar el SQL y revisa que el usuario haya confirmado el correo cuando esa opción está activa.
