# Medix Notification Service – Setup

## Requisitos

* Python 3.10 o superior
* pip

---

## 1. Crear entorno virtual

```bash
python3 -m venv venv
```

### Activar entorno

**Linux / Mac**

```bash
source venv/bin/activate
```

**Windows**

```bash
venv\Scripts\activate
```

---

## 2. Instalar dependencias

```bash
pip install fastapi uvicorn requests apscheduler python-dotenv
```

---

## 3. Ejecutar el servidor

```bash
uvicorn app.main:app --reload
```

