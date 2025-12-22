#!/bin/bash

# =============================
# CONFIGURACIÓN
# =============================
DB_NAME="pic_idsn"
DB_USER="postgres"
DB_HOST="127.0.0.1"
DB_PORT="5432"

BACKUP_DIR="/var/backups/postgres"
DATE=$(date +"%Y-%m-%d_%H-%M")

# Archivo final
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_$DATE.sql.gz"

# =============================
# CREAR DIRECTORIO SI NO EXISTE
# =============================
mkdir -p $BACKUP_DIR

# =============================
# BACKUP
# =============================
export PGPASSWORD="Gest1onPic_BD"

pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME | gzip > $BACKUP_FILE

# =============================
# VALIDAR
# =============================
if [ $? -eq 0 ]; then
  echo "✅ Backup realizado correctamente: $BACKUP_FILE"
else
  echo "❌ Error realizando el backup"
fi

# =============================
# LIMPIEZA (borra backups > 7 días)
# =============================
find $BACKUP_DIR -type f -name "*.gz" -mtime +7 -delete

pscp sistemas@172.16.4.6:/var/backups/postgres/pic_idsn_2025-12-22_19-16.sql.gz "C:\Users\LABORATORIO CORDI\Documents\pic_idsn_2025-12-22_19-16.sql.gz"


