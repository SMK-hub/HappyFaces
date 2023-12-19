package com.example.Demo.LogService;

import com.example.Demo.LogModel.Admin;

public interface UserService {
    String registerUser(Admin user);
    boolean loginUser(String email, String password);
}
