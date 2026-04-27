

--eliminar el job si ya existe
select cron.unschedule('reminders-job');


--programar el job para que se ejecute cada 5 minutos
select cron.schedule(
  'reminders-job',
  '*/1 * * * *', -- cada 1 minuto
  $$
  select net.http_post(
    url := 'https://senior-straw-headpiece.ngrok-free.dev/api/process-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-api-key', 'mi_secreto_super_seguro'
    )
  );
  $$
);

-- Ver Cron Jobs
select * from cron.job;

-- Ver detalles de ejecuciones
select * from cron.job_run_details
order by start_time desc;