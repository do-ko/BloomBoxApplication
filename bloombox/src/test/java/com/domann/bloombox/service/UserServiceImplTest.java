package com.domann.bloombox.service;

import com.domann.bloombox.dao.UserDAO;
import com.domann.bloombox.entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserServiceImplTest {
    private final UserDAO userDAO = Mockito.mock(UserDAO.class);
    ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);

    @Test
    @DisplayName("Test should pass when all users are returned")
    void checkIfAllUsersAreReturned() {
        UserServiceImpl userService = new UserServiceImpl(userDAO);
        User user1 = new User("login1", "pass1");
        user1.setUserId(1);
        User user2 = new User("login2", "pass2");
        user2.setUserId(2);
        User user3 = new User("login3", "pass3");
        user2.setUserId(3);
        List<User> listOfUser = new ArrayList<>();
        listOfUser.add(user1);
        listOfUser.add(user2);
        listOfUser.add(user3);

        Mockito.when(userDAO.findAllUsers()).thenReturn(listOfUser);

        List<User> actualResponse = userService.findAllUsers();

        Assertions.assertIterableEquals(listOfUser, actualResponse);
    }

    @Test
    @DisplayName("Test should pass when correct user is returned based on id")
    void checkIfCorrectUserIsReturnedById() {
        UserServiceImpl userService = new UserServiceImpl(userDAO);
        User user1 = new User("login1", "pass1");
        user1.setUserId(1);

        Mockito.when(userDAO.findById(1)).thenReturn(user1);

        User actualResponse = userService.findById(1);

        Assertions.assertEquals(user1.getUserId(), actualResponse.getUserId());
        Assertions.assertEquals(user1.getUserLogin(), actualResponse.getUserLogin());
        Assertions.assertEquals(user1.getUserPassword(), actualResponse.getUserPassword());
    }

    @Test
    @DisplayName("Test should pass when an exception is thrown and exception message is correct")
    void checkIfExceptionIsThrownIfUserEqualsNull() {
        UserServiceImpl userService = new UserServiceImpl(userDAO);

        Mockito.when(userDAO.findById(1)).thenReturn(null);

        RuntimeException thrownException = assertThrows(
                RuntimeException.class,
                () -> userService.findById(1),
                "Expected userService to throw a RuntimeException but it didn't"
        );

        assertEquals(thrownException.getMessage(), "Did not find user with id: 1");
    }

    @Test
    @DisplayName("Test should pass when correct user is returned based on login")
    void checkIfCorrectUserIsReturnedByLogin() {
        UserServiceImpl userService = new UserServiceImpl(userDAO);
        User user1 = new User("login1", "pass1");
        user1.setUserId(1);

        Mockito.when(userDAO.findByLogin("login1")).thenReturn(user1);

        User actualResponse = userService.findByLogin("login1");

        Assertions.assertEquals(user1.getUserId(), actualResponse.getUserId());
        Assertions.assertEquals(user1.getUserLogin(), actualResponse.getUserLogin());
        Assertions.assertEquals(user1.getUserPassword(), actualResponse.getUserPassword());
    }

    @Test
    @DisplayName("Test should pass when correct user is returned based on credentials")
    void checkIfCorrectUserIsReturnedByCredentials() {
        UserServiceImpl userService = new UserServiceImpl(userDAO);
        User user1 = new User("login1", "pass1");
        user1.setUserId(1);

        Mockito.when(userDAO.findByCredentials("login1","pass1")).thenReturn(user1);

        User actualResponse = userService.findByCredentials("login1","pass1");

        Assertions.assertEquals(user1.getUserId(), actualResponse.getUserId());
        Assertions.assertEquals(user1.getUserLogin(), actualResponse.getUserLogin());
        Assertions.assertEquals(user1.getUserPassword(), actualResponse.getUserPassword());
    }

    @Test
    @DisplayName("Test should pass when save method calls userDAO save method (actually saves user to database)")
    void checkIfUserIsAdded() {
        UserServiceImpl userService = new UserServiceImpl(userDAO);
        User user1 = new User("login1", "pass1");
        user1.setUserId(1);

        Mockito.when(userDAO.save(user1)).thenReturn(user1);

        User actualResponse = userService.save(user1);

        Mockito.verify(userDAO, Mockito.times(1)).save(ArgumentMatchers.any(User.class));
    }

    @Test
    @DisplayName("Test should pass when save method returns correct object")
    void checkIfAddedUserIsReturnedAsResponse() {
        UserServiceImpl userService = new UserServiceImpl(userDAO);
        User user1 = new User("login1", "pass1");
        user1.setUserId(1);

        Mockito.when(userDAO.save(user1)).thenReturn(user1);

        User actualResponse = userService.save(user1);

        Assertions.assertEquals(user1.getUserId(), actualResponse.getUserId());
        Assertions.assertEquals(user1.getUserLogin(), actualResponse.getUserLogin());
        Assertions.assertEquals(user1.getUserPassword(), actualResponse.getUserPassword());
    }

    @Test
    @DisplayName("Test should pass when save method passes correct object to UserDAO")
    void checkIfSavePassesCorrectObject() {
        UserServiceImpl userService = new UserServiceImpl(userDAO);
        User user1 = new User("login1", "pass1");
        user1.setUserId(1);

        Mockito.when(userDAO.save(user1)).thenReturn(user1);

        User actualResponse = userService.save(user1);

        Mockito.verify(userDAO, Mockito.times(1)).save(userArgumentCaptor.capture());

        Assertions.assertEquals(user1.getUserId(), userArgumentCaptor.getValue().getUserId());
        Assertions.assertEquals(user1.getUserLogin(), userArgumentCaptor.getValue().getUserLogin());
        Assertions.assertEquals(user1.getUserPassword(), userArgumentCaptor.getValue().getUserPassword());
    }

    @Test
    @DisplayName("Test should pass when deleteById method calls userDAO deleteById method (actually deletes user from database)")
    void checkIfDeleteByIdRemovesUser() {
        UserServiceImpl userService = new UserServiceImpl(userDAO);

        userService.deleteById(1);

        Mockito.verify(userDAO, Mockito.times(1)).deleteById(1);
    }
}