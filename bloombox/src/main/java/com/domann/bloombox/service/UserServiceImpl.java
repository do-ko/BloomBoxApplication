package com.domann.bloombox.service;

import com.domann.bloombox.dao.UserDAO;
import com.domann.bloombox.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
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
    }

    @Override
    public User findByLogin(String login) {
        return userDAO.findByLogin(login);
    }

    @Override
    public User findByCredentials(String login, String password) {
        return userDAO.findByCredentials(login, password);
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
