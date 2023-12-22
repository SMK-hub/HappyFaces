package com.example.Demo.AdminServices;


import java.util.List;

import com.example.Demo.Model.Admin;
import com.example.Demo.Model.Donations;
import com.example.Demo.Model.Donor;
import com.example.Demo.Model.Events;
import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;

public interface AdminService {
    
	public List<Admin> getAllAdmin();
	public List<Orphanage> getAllOrphanage();
    public List<Donor> getAllDonor();
	public List<Events> getAllEvents();
	public List<Donations> getAllDonations();
	String registerUser(Admin user);
    boolean loginUser(String email, String password);
    String verifyOrphanageDetails(OrphanageDetails orph);
    
}
