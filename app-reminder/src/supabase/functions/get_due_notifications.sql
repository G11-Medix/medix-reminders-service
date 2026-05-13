create or replace function get_due_notifications()
returns table (
  id bigint,
  fecha_cita timestamptz,
  id_institucion bigint,
  id_especialidad bigint,
  id_paciente bigint,
  telefono varchar,
  codigo varchar,
  recordatorio_24h_enviado boolean,
  recordatorio_1h_enviado boolean,
  type text
)
language sql
as $$
  select
    n.id,
    n.fecha_cita,
    n.id_institucion,
    n.id_especialidad,
    n.id_paciente,
    n.telefono,
    n.codigo,
    n.recordatorio_24h_enviado,
    n.recordatorio_1h_enviado,

    case
      when n.fecha_cita <= now() + interval '24 hours'
       and n.fecha_cita > now() + interval '1 hour'
       and not n.recordatorio_24h_enviado
      then '24h'

      when n.fecha_cita <= now() + interval '1 hour'
       and n.fecha_cita > now()
       and not n.recordatorio_1h_enviado
      then '1h'
    end as type

  from notificaciones_citas n
  where
    (
      (n.fecha_cita <= now() + interval '24 hours'
       and n.fecha_cita > now() + interval '1 hour'
       and not n.recordatorio_24h_enviado)

      or

      (n.fecha_cita <= now() + interval '1 hour'
       and n.fecha_cita > now()
       and not n.recordatorio_1h_enviado)
    );
$$;