FROM maven:3-openjdk-8 as builder
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN mvn clean install

FROM openjdk:8-slim
EXPOSE 8087

ENV JAVA_OPTS=""
COPY --from=builder /app/target/tmdt-1.0.jar app.jar

RUN sh -c 'touch /app.jar'

CMD [ "java", "-jar" ,"app.jar" ]

