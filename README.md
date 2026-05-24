# Medix Reminders Service

Servicio backend orientado a la gestión de recordatorios dentro del ecosistema Medix. Su propósito dentro del proyecto de grado es apoyar los procesos relacionados con notificaciones y recordatorios

## Descripción general

Este repositorio contiene una aplicación backend construida con Node.js. El repositorio pertenece al sistema Medix y cumple el rol de microservicio backend para funcionalidades asociadas a recordatoriosy notifaccion de citas.


## Requisitos previos

- Python 3.12 o superior, según la imagen Docker utilizada.
- pip.
- Entorno virtual de Python recomendado.
- Docker, si se desea ejecutar el servicio en contenedor.
- Acceso a Supabase, pendiente por validar con el equipo.
- Variables de entorno requeridas para Supabase, pendientes por confirmar con el equipo.

## Tecnologías

- Node.js
- TypeScript
- Express
- Supabase
- Twilio
- Firebase

---


## Instalación

1. Clonar repo:
```bash
git clone <repo>
cd REMINDERS
```

2. Instalar dependencias:
```bash
npm install
```

---


## Variables de entorno

El README previo menciona el uso de `SUPABASE_SERVICE_ROLE_KEY` para operaciones administrativas en backend. El código también depende de un cliente de Supabase, pero el archivo de configuración específico no está presente en el repositorio actual.

Ejemplo de variables pendientes por validar:

```env
PORT=3000
SUPABASE_URL=https://proyecto.supabase.co
SUPABASE_KEY=clave_anonima_segura
SUPABASE_SERVICE_ROLE_KEY=clave_service_role_segura
TWILIO_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP=whatsapp:+14155238886
API_KEY=my_super_secret_api_key
JWT_SECRET=my_super_secret_jwt_key
MAGIC_LINK_BASE_URL=http://192.168.20.20:8001
```

No se deben versionar credenciales reales. Los nombres, obligatoriedad y uso exacto de estas variables deben ser confirmados por el equipo de desarrollo.

## Ejecutar

```bash
cd ../app-reminder
```

```bash
npx ts-node-dev src/server.ts
```

En dasarollo se debe usar NGrock y cambiar el cron en Supabase con la nueva direccion: 

```bash
ngrok http 3000
```


Este repositorio forma parte del ecosistema Medix de la organización académica `G11-Medix`. Por su nombre y documentación previa, se relaciona con otros servicios o aplicaciones encargados de la gestión de pacientes, autenticación, administración y recordatorios.

La relación exacta con otros repositorios debe ser documentada por el equipo de desarrollo.

## Estado del proyecto

Prototipo académico finalizado.



## Autores

Proyecto desarrollado como parte del trabajo de grado.

Equipo de desarrollo:

* Adrián Eduardo Ruiz Cerquera
* Leonardo Velázquez Colin
* Diego Alejandro Jara Rojas
* Jairo Andrés Sierra Combariza

## Licencia

* CC BY-NC 4.0
