-- 1. Activar RLS en el bucket images
UPDATE storage.buckets SET public = false WHERE name = 'images';

-- 2. Eliminar política existente si hay
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- 3. Política: solo usuarios autenticados pueden subir archivos
CREATE POLICY "authenticated_upload" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'images');

-- 4. Política: cualquiera puede leer imágenes (para mostrar en la web)
CREATE POLICY "public_read" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'images');
