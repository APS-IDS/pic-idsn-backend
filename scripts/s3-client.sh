#!/bin/sh

set -eu

usage() {
	cat <<'EOF'
Uso: s3-client.sh -b BUCKET -f ARCHIVO [-k CLAVE] [-p PERFIL] [-r REGION] [-d]
Opciones:
	-b BUCKET          Nombre del bucket S3 (obligatorio)
	-f ARCHIVO         Ruta del archivo local a subir (obligatorio)
	-k CLAVE           Clave/Key destino en S3 (por defecto nombre del archivo)
	-p PERFIL          Perfil de AWS CLI (opcional)
	-r REGION          Región de AWS (opcional)
	-d                 Descargar desde S3 (usa -k como key remoto y -f como ruta local destino)
	-n                 Dry-run (muestra la acción sin subir)
	-h                 Mostrar esta ayuda
Requisitos: AWS CLI instalado y credenciales configuradas.
EOF
}

# Verificar AWS CLI
if ! command -v aws >/dev/null 2>&1; then
	echo "Error: AWS CLI no está instalado o no está en PATH." >&2
	exit 1
fi

BUCKET=""
FILE=""
KEY=""
PROFILE=""
REGION=""
ACL=""
STORAGE_CLASS=""
DRYRUN=false
DOWNLOAD=false

# Parseo de opciones
while getopts "b:f:k:p:r:dnh" opt; do
	case "$opt" in
		b) BUCKET="$OPTARG" ;;
		f) FILE="$OPTARG" ;;
		k) KEY="$OPTARG" ;;
		p) PROFILE="$OPTARG" ;;
		r) REGION="$OPTARG" ;;
		e) SSE="$OPTARG" ;;
		d) DOWNLOAD=true ;;
		n) DRYRUN=true ;;
		h) usage; exit 0 ;;
		*) usage; exit 1 ;;
	esac
done
shift $((OPTIND - 1))

# Validaciones
if [ -z "$BUCKET" ] || [ -z "$FILE" ]; then
	echo "Error: -b BUCKET y -f ARCHIVO son obligatorios." >&2
	usage
	exit 1
fi

# Validar existencia del archivo local solo en modo subida
if [ "$DOWNLOAD" = "false" ] && [ ! -f "$FILE" ]; then
	echo "Error: archivo no encontrado: $FILE" >&2
	exit 1
fi

# Definir KEY por defecto como el nombre del archivo
if [ -z "$KEY" ]; then
	if command -v basename >/dev/null 2>&1; then
		KEY=$(basename "$FILE")
	else
		KEY=${FILE##*/}
	fi
fi

S3_PATH="s3://$BUCKET/$KEY"

# Construir argumentos de S3 según modo
if [ "$DOWNLOAD" = "true" ]; then
	set -- s3 cp "$S3_PATH" "$FILE"
else
	set -- s3 cp "$FILE" "$S3_PATH"
fi
[ -n "$ACL" ] && set -- "$@" --acl "$ACL"
[ -n "$STORAGE_CLASS" ] && set -- "$@" --storage-class "$STORAGE_CLASS"
[ "$DRYRUN" = "true" ] && set -- "$@" --dryrun

if [ "$DOWNLOAD" = "true" ]; then
	echo "Descargando $S3_PATH a $FILE ..."
else
	echo "Subiendo $FILE a $S3_PATH ..."
fi

# Mostrar comando a ejecutar (preview)
CMD="aws"
if [ -n "$PROFILE" ] && [ -n "$REGION" ]; then
	CMD="aws --profile \"$PROFILE\" --region \"$REGION\""
elif [ -n "$PROFILE" ]; then
	CMD="aws --profile \"$PROFILE\""
elif [ -n "$REGION" ]; then
	CMD="aws --region \"$REGION\""
fi
echo "Comando: $CMD $*"

# Ejecutar con perfil/región si se especificaron
if [ -n "$PROFILE" ] && [ -n "$REGION" ]; then
	aws --profile "$PROFILE" --region "$REGION" "$@"
elif [ -n "$PROFILE" ]; then
	aws --profile "$PROFILE" "$@"
elif [ -n "$REGION" ]; then
	aws --region "$REGION" "$@"
else
	aws "$@"
fi

STATUS=$?

if [ $STATUS -eq 0 ]; then
	if [ "$DOWNLOAD" = "true" ]; then
		echo "Descarga completada."
	else
		echo "Subida completada."
	fi
else
	if [ "$DOWNLOAD" = "true" ]; then
		echo "Error al descargar el archivo (código $STATUS)." >&2
	else
		echo "Error al subir el archivo (código $STATUS)." >&2
	fi
	exit $STATUS
fi


