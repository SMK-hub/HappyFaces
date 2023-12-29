package com.example.Demo.AdminServices;


import java.util.List;
import java.util.Optional;

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
    Optional<OrphanageDetails> getOrphanageDetailByOrphanageId(String orpId);
	String verifyOrphanageDetails(OrphanageDetails orph);
	String verifyEventDetails(Events event);
	Orphanage getOrphanageById(String id);
	Donor getDonorById(String id);
	Admin getAdminById(String id);
	Events getEventById(String id);
	List<Events> getEventsByOrphanageId(String id);
	Donations getDonationById(String id);
	List<Donations> getDonationsByOrphanageId(String id);
	List<Donations> getDonationsByDonorId(String id);

}
