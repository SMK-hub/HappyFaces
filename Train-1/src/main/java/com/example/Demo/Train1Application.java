package com.example.Demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.example.Demo")
public class Train1Application {

	public static void main(String[] args) {
		SpringApplication.run(Train1Application.class, args);
	}

}
