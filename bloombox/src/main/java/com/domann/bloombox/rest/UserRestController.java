package com.domann.bloombox.rest;

import com.domann.bloombox.entity.Location;
import com.domann.bloombox.entity.Plant;
import com.domann.bloombox.entity.User;
import com.domann.bloombox.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserRestController {
    private UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public List<User> findAll(){
        return userService.findAllUsers();
    }

//    @GetMapping("/{userID}")
//    public User findById(@PathVariable int userID){
//        User user = userService.findById(userID);
//        if (user==null){
//            throw new LocationNotFoundException("Location id not found - " + userID);
//        }
//        return user;
//    }

    @GetMapping("/{userLogin}")
    public User findByLogin(@PathVariable String userLogin){
        User user = userService.findByLogin(userLogin);
        if (user == null){
            throw new LocationNotFoundException("Location id not found - " + userLogin);
        }
        return user;
    }

    @PostMapping("")
    public User addUser(@RequestBody User user){
        user.setUserId(0);
        return userService.save(user);
    }

    @PutMapping("")
    public User updateUser(@RequestBody User user){
        return userService.save(user);
    }

    @DeleteMapping("/{userId}")
    public String deleteUser(@PathVariable int userId){
        User user = userService.findById(userId);
        if (user==null){
            throw new LocationNotFoundException("User id not found - " + userId);
        }

        userService.deleteById(userId);

        return "Deleted plant with id: " + userId;
    }
}
