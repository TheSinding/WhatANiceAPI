#/bin/bash
NAME="simonsinding"
APP_NAME="wana"
REGION="eu"
REPO="gcr.io"
PROJECT="tea-project-211819"
VERSION="0.1.6.3"
CONTAINER_NAME="${NAME}/${APP_NAME}:v${VERSION}"
GOOGLE_CONTAINER_NAME="${REGION}.${REPO}/${PROJECT}/${CONTAINER_NAME}"

echo "Building $CONTAINER_NAME"
docker build -t "${CONTAINER_NAME}" .

echo "Tagging $CONTAINER_NAME with ${GOOGLE_CONTAINER_NAME}"
docker tag "${CONTAINER_NAME}" "${GOOGLE_CONTAINER_NAME}"

echo "Pushing container to ${GOOGLE_CONTAINER_NAME}"
docker push "${GOOGLE_CONTAINER_NAME}"
