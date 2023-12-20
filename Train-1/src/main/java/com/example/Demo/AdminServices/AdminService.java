package com.example.Demo.AdminServices;

//import java.util.List;

import com.example.Demo.Model.Admin;
//import com.example.Demo.Model.Orphanage;

public interface AdminService {
    
	String registerUser(Admin user);
    boolean loginUser(String email, String password);
//    public List<Orphanage> getAllEvents();
//    public List<> getAllEvents();

}
