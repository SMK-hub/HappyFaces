package com.example.Demo.AdminServices;

import com.example.Demo.Model.Admin;

public interface AdminService {
    String registerUser(Admin user);
    boolean loginUser(String email, String password);
}
