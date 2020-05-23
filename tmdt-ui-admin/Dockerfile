FROM maven:3-openjdk-8 as builder
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN mvn clean install

FROM nginx:alpine

COPY --from=build /app/angular/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



