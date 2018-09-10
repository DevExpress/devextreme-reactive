#!/bin/sh

commit=$(git rev-parse HEAD)
branch=$(git rev-parse --abbrev-ref HEAD)
docker build -t dx-demos \
    --build-arg commit="$commit" --build-arg branch="$branch" \
    .
