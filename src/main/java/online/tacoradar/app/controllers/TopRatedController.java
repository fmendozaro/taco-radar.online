package online.tacoradar.app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class TopRatedController {

    @GetMapping("/toprated/{category}")
    public String showTopRated(@PathVariable String category){
        return "top-rated";
    }
}
