package com.domann.bloombox.service;

import com.domann.bloombox.dao.UserDAO;
import com.domann.bloombox.entity.Location;
import com.domann.bloombox.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    private UserDAO userDAO;

    @Autowired
    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Override
    public List<User> findAllUsers() {
        return userDAO.findAllUsers();
    }

    @Override
    public User findById(int id) {
        User user = userDAO.findById(id);
        if (user == null) {
            throw new RuntimeException("Did not find user with id: " + id);
        } else {
            return user;
        }
//        User user = null;
//        if (result.isPresent()){
//            user = result.get();
//        } else {
//            throw new RuntimeException("Did not find location with id: " + id);
//        }
//        return user;
    }

    @Override
    public User findByLogin(String login) {
        return userDAO.findByLogin(login);
    }

    @Transactional
    @Override
    public User save(User user) {
        return userDAO.save(user);
    }

    @Transactional
    @Override
    public void deleteById(int id) {
        userDAO.deleteById(id);
    }
}
