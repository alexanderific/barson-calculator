package com.barson.calculator

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.ApplicationContext

/**
 * Spring-Boot application initializer.
 * @author Alex Barson
 */
@SpringBootApplication
class App {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(App.class, args)
    }
}
