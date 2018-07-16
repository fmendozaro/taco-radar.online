package online.tacoradar.app.controllers;

import online.tacoradar.app.models.User;
import online.tacoradar.app.repositories.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;

@Controller
public class UsersController {

    @Autowired
    UsersRepo usersRepo;

    @GetMapping("/register")
    public String register(Model model){
        model.addAttribute("user", new User());
        return "users/register";
    }

    @PostMapping("/register")
    public String saveUser(@Valid User user, Errors validation, Model model){

        if (validation.hasErrors()) {
            model.addAttribute("errors", validation);
            model.addAttribute("user", user);
            return "users/register";
        }

        usersRepo.save(user);
        return "redirect:users/profile/";
    }

    @GetMapping("/users/profile")
    public String showProfile(Model model){
        model.addAttribute("user", usersRepo.findOne(1L));
        return "users/profile";
    }
}
