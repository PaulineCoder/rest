package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class PageController {

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/test")
    public String test() {
        return "test";
    }


    @GetMapping("/panel")
    public String panel() {
        return "panel";
    }

    @GetMapping("/user")
    public String user() {
        return "user";
    }
}
