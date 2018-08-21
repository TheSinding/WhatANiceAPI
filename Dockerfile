FROM node:alpine
ENV GOOGLE_APPLICATION_CREDENTIALS=./keys/randomly-nice-e65c3691d581.json
WORKDIR /usr/src/wana
LABEL name="What a nice API"
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
COPY . .
EXPOSE 3030
CMD npm start