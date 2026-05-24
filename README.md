# Medix Reminders Service

Servicio backend orientado a la gestión de recordatorios dentro del ecosistema Medix. Su propósito dentro del proyecto de grado es apoyar los procesos relacionados con notificaciones, autenticación de usuarios y validación de acceso en el sistema académico de salud.

## Descripción general

Este repositorio contiene una aplicación backend construida con FastAPI. Según la estructura actual del código, el servicio expone una aplicación ASGI y contiene módulos preparados para API, autenticación, base de datos, modelos, repositorios, esquemas y servicios.

El repositorio pertenece al sistema Medix y cumple el rol de microservicio backend para funcionalidades asociadas a recordatorios y control de acceso. El README previo del repositorio documenta integración con Supabase, validación de tokens Bearer, control de usuarios activos y auditoría de operaciones bajo rutas `/api/*`; sin embargo, parte de esa implementación no se encuentra completa en los archivos actuales y debe ser validada por el equipo de desarrollo.

## Tecnologías utilizadas

- Lenguaje: Python 3.12
- Framework: FastAPI
- Servidor ASGI: Uvicorn
- Base de datos: Supabase, pendiente por validar configuración completa
- Librerías principales:
  - `fastapi`
  - `uvicorn[standard]`
  - `pydantic-settings`
  - `supabase`
  - `httpx`
  - `pytest`
- Herramientas:
  - Docker
  - pip
  - Entornos virtuales de Python
- Servicios externos:
  - Supabase Auth y tablas de Supabase, según la dependencia de autenticación y el README previo

## Arquitectura del repositorio

```bash
/
├── app/
│   ├── api/
│   │   └── dependencies/
│   │       └── auth.py
│   ├── core/
│   ├── db/
│   ├── models/
│   ├── repositories/
│   ├── schemas/
│   ├── services/
│   └── main.py
├── dockerfile
├── requirements.txt
└── README.md
```

- `app/main.py`: punto de entrada de la aplicación FastAPI. Actualmente instancia `app = FastAPI()`.
- `app/api/`: carpeta destinada a rutas, controladores o dependencias de la API.
- `app/api/dependencies/auth.py`: contiene dependencias de autenticación para validar tokens Bearer con Supabase y verificar usuarios activos en la tabla `Usuario`.
- `app/core/`: carpeta reservada para configuración central, procesos compartidos o tareas del servicio.
- `app/db/`: carpeta destinada a la configuración de acceso a base de datos o clientes externos. El archivo `app/db/supabase.py` es referenciado por el código, pero no se encuentra en el repositorio actual.
- `app/models/`: carpeta destinada a modelos de dominio o persistencia.
- `app/repositories/`: carpeta destinada a la capa de acceso a datos.
- `app/schemas/`: carpeta destinada a esquemas de validación y transferencia de datos.
- `app/services/`: carpeta destinada a lógica de negocio.
- `requirements.txt`: lista de dependencias Python necesarias para instalar el proyecto.
- `dockerfile`: definición de imagen Docker para ejecutar el servicio con Uvicorn.

## Requisitos previos

- Python 3.12 o superior, según la imagen Docker utilizada.
- pip.
- Entorno virtual de Python recomendado.
- Docker, si se desea ejecutar el servicio en contenedor.
- Acceso a Supabase, pendiente por validar con el equipo.
- Variables de entorno requeridas para Supabase, pendientes por confirmar con el equipo.

## Instalación

```bash
git clone https://github.com/G11-Medix/medix-reminders-service.git
cd medix-reminders-service
```

Crear y activar un entorno virtual:

```bash
cd ../app-reminder
```

Instalar dependencias:

```bash
pip install -r requirements.txt
```

## Variables de entorno

El README previo menciona el uso de `SUPABASE_SERVICE_ROLE_KEY` para operaciones administrativas en backend. El código también depende de un cliente de Supabase, pero el archivo de configuración específico no está presente en el repositorio actual.

Ejemplo de variables pendientes por validar:

```env
SUPABASE_URL=https://proyecto.supabase.co
SUPABASE_ANON_KEY=clave_anonima_segura
SUPABASE_SERVICE_ROLE_KEY=clave_service_role_segura
```

No se deben versionar credenciales reales. Los nombres, obligatoriedad y uso exacto de estas variables deben ser confirmados por el equipo de desarrollo.

## Ejecución local

Ejecutar la aplicación con Uvicorn:

```bash
uvicorn app.main:app --reload
```

Por defecto, el servicio queda disponible en:

```bash
http://localhost:8000
```

Documentación interactiva de FastAPI:

```bash
http://localhost:8000/docs
http://localhost:8000/redoc
```

Ejecución con Docker:

```bash
docker build -t medix-reminders-service -f dockerfile .
docker run --env-file .env -p 8000:8000 medix-reminders-service
```

## Pruebas

El archivo `requirements.txt` incluye `pytest`, por lo que las pruebas automatizadas pueden ejecutarse con:

```bash
ngrok http 3000
```

No se identificaron archivos de pruebas en el análisis inicial del repositorio. La cobertura y los casos de prueba deben ser agregados o confirmados por el equipo de desarrollo.

## Uso general

Este repositorio se utiliza como servicio backend dentro del sistema Medix. En su estado actual, expone una aplicación FastAPI base y una dependencia de autenticación reutilizable.

Según la documentación previa del repositorio:

- Las rutas bajo `/api/*` requieren encabezado `Authorization: Bearer <token>`.
- El token se valida contra Supabase Auth mediante `auth.get_user`.
- El usuario autenticado debe existir en la tabla `Usuario` y tener estado `ACTIVO`.
- Los roles administrativos reconocidos son `ADMIN`, `ADMINISTRADOR` y `SUPERADMIN`.
- Las rutas públicas incluyen `/`, `/docs`, `/redoc` y `/openapi.json`.
- La política de auditoría esperada registra operaciones bajo `/api/*` en `Log_Auditoria` con resultado `EXITO` o `ERROR`.

Endpoints mencionados en el README previo, pendientes por confirmar en la implementación actual:

```bash
GET /auth/eligibility/{telefono}
POST /api/admin/pacientes/{id_paciente}/grant-access
```

## Relación con otros repositorios

Este repositorio forma parte del ecosistema Medix de la organización académica `G11-Medix`. Por su nombre y documentación previa, se relaciona con otros servicios o aplicaciones encargados de la gestión de pacientes, autenticación, administración y recordatorios.

La relación exacta con otros repositorios debe ser documentada por el equipo de desarrollo.

## Estado del proyecto

Prototipo académico finalizado.

## Convenciones

Convenciones detectadas:

- Estructura modular bajo `app/`.
- Separación sugerida por capas: API, dependencias, base de datos, modelos, repositorios, esquemas y servicios.
- Uso de variables de entorno para credenciales y configuración sensible.
- Uso de Docker para empaquetar y ejecutar el servicio.

Convenciones recomendadas:

- Nombres de ramas:
  - `main` para versión estable.
  - `develop` para integración.
  - `feature/nombre-funcionalidad` para nuevas funcionalidades.
  - `fix/nombre-correccion` para correcciones.
- Estilo de commits:
  - `feat: descripción breve`
  - `fix: descripción breve`
  - `docs: descripción breve`
  - `refactor: descripción breve`
  - `test: descripción breve`
- Estructura de carpetas:
  - Mantener rutas en `app/api/`.
  - Mantener lógica de negocio en `app/services/`.
  - Mantener acceso a datos en `app/repositories/`.
  - Mantener esquemas de entrada y salida en `app/schemas/`.
- Variables de entorno:
  - Usar `.env` local y mantener `.env.example` sin credenciales reales.
  - No versionar secretos.
- Formato de código:
  - Mantener tipado explícito cuando sea posible.
  - Usar nombres descriptivos en español o inglés de forma consistente.
  - Agregar pruebas para dependencias críticas como autenticación, autorización y auditoría.

## Autores

Proyecto desarrollado como parte del trabajo de grado.

Equipo de desarrollo:

* Adrián Eduardo Ruiz Cerquera
* Leonardo Velázquez Colin
* Diego Alejandro Jara Rojas
* Jairo Andrés Sierra Combariza

## Licencia

* CC BY-NC 4.0
