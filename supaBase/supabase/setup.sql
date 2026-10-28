-- Ejecuta este archivo desde Supabase Dashboard > SQL Editor.
-- Crea tareas privadas por usuario y el bucket privado de avatares.

create table if not exists public.tareas (
  id bigint generated always as identity primary key,
  titulo text not null check (length(trim(titulo)) > 0),
  completada boolean not null default false,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  created_at timestamptz not null default now()
);

alter table public.tareas enable row level security;
grant select, insert, update, delete on public.tareas to authenticated;
grant usage, select on sequence public.tareas_id_seq to authenticated;

drop policy if exists "ver mis tareas" on public.tareas;
create policy "ver mis tareas" on public.tareas
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "crear mis tareas" on public.tareas;
create policy "crear mis tareas" on public.tareas
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "editar mis tareas" on public.tareas;
create policy "editar mis tareas" on public.tareas
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "borrar mis tareas" on public.tareas;
create policy "borrar mis tareas" on public.tareas
  for delete to authenticated using ((select auth.uid()) = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', false, 2097152, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "subir a mi carpeta" on storage.objects;
create policy "subir a mi carpeta" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "ver mis avatares" on storage.objects;
create policy "ver mis avatares" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "reemplazar mis archivos" on storage.objects;
create policy "reemplazar mis archivos" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "eliminar mis archivos" on storage.objects;
create policy "eliminar mis archivos" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

-- Activa los cambios en tiempo real para la tabla, sin duplicar su membresía.
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'tareas'
  ) then
    alter publication supabase_realtime add table public.tareas;
  end if;
end
$$;
