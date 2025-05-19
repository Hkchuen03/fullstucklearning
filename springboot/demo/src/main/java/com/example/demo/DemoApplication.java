package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@ComponentScan({"com.example.controller", "com.example.service", "com.example.repository", "com.example.model", "com.example.demo"})
@EntityScan({"com.example.controller", "com.example.service", "com.example.repository", "com.example.model", "com.example.demo"})
public class DemoApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
