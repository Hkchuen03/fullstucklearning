package com.example.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
@RequestMapping("/demo")
public class DemoController {
  @GetMapping("/hello")
  public String Hello() {
    return "Hellooo";
  }

  @GetMapping("/home") 
  public String home() {
    return "home";
  }
}
