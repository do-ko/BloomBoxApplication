package com.domann.bloombox.dao;

import com.domann.bloombox.entity.User;

import java.util.List;

public interface UserDAO {
    List<User> findAllUsers();

    User findById(int id);

    User findByLogin(String login);

    User save(User user);

    void deleteById(int id);
}
