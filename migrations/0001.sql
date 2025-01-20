ALTER TABLE "title_variant"
ADD CONSTRAINT title_variant_source_unique UNIQUE (source, source_id);