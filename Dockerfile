FROM node:10.10.0-alpine

WORKDIR /sources
ADD . .

ARG commit=N/A
ARG branch=N/A

ENV GIT_COMMIT=$commit GIT_BRANCH=$branch
LABEL commit=$commit branch=$branch

RUN yarn

CMD ["yarn", "build:watch"]
