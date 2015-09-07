## barson-calculator
A simple web based calculator app built on AngularJS, powered by Spring Boot using Groovy and embedded Jetty, and built by Gradle.

## getting started
This application is easy to build and run as soon as you have cloned this repo. It comes with gradlew included, so no need to worry about getting a gradle installtion. You will likely need a groovy installation available, however.

Alternatively, there are binaries available in this repo as well for simple execution.

### running from source

To build and begin running the application:
* Navigate to the root directory and run the `gradlew bootRun` command.
    * This will run a full Gradle build and initialize spring-boot.
* Once the build successfully completes, you will be able to navigate to the app at a localhost/ip address specified at the port(s) listed in the spring-boot console (`Jetty started on port(s) ____`)
    * This will likely be [http://localhost:8080/](http://localhost:8080/)
* And that's it. The application should be initialized and the calculator should be online.

### running from binary

To execute a prebuilt artifact:
* Prebuilt releases of the application binary can be found in the [releases](https://github.com/alexanderific/barson-calculator/releases) section of the repo.
    * https://github.com/alexanderific/barson-calculator/releases/tag/1.0-SNAPSHOT
* Download the JAR file and execute it using the `java -jar` command.
    * `java -jar barson-calculator-1.0-SNAPSHOT.jar`
* sprint-boot will initialize and begin hosting the app immediately. You will be able to navigate to the app at a localhost/ip address specified at the port(s) listed in the spring-boot console (`Jetty started on port(s) ____`)
     * This will likely be [http://localhost:8080/](http://localhost:8080/)
* And that's it. The application should be initialized and the calculator should be online.


