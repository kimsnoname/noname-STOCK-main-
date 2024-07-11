FROM eclipse-temurin:17
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
# Set the entry point
ENTRYPOINT ["java", "-jar", "/app.jar"]