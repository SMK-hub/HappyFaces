package com.example.Demo.AdminServices;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.Demo.EmailServices.EmailService;
import com.example.Demo.Model.Admin;
import com.example.Demo.Model.Donations;
import com.example.Demo.Model.Donor;
import com.example.Demo.Model.Events;
import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;
import com.example.Demo.Repository.AdminRepository;
import com.example.Demo.Repository.DonationsRepository;
import com.example.Demo.Repository.DonorRepository;
import com.example.Demo.Repository.EventsRepository;
import com.example.Demo.Repository.OrphanageDetailsRepository;
import com.example.Demo.Repository.OrphanageRepository;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminRepository userRepository;
	@Autowired
	private EmailService emailService;
	@Autowired
	private AdminRepository adminRepo;
	@Autowired
	private OrphanageRepository orphanageRepo;
	@Autowired
	private OrphanageDetailsRepository orphDetails;
	@Autowired
	private DonorRepository donorRepo;
	@Autowired
	private EventsRepository eventRepo;
	@Autowired
	private DonationsRepository donationRepo;
	
	private String passcode="Admin123Admin";
	
	Sort sort = Sort.by(Sort.Order.asc("name"));

	@Override
	public List<Admin> getAllAdmin() {
		return (List<Admin>) adminRepo.findAll(sort);
	}

	@Override
	public List<Orphanage> getAllOrphanage() {
		return (List<Orphanage>) orphanageRepo.findAll(sort);
	}

	@Override
	public List<Donor> getAllDonor() {
		return (List<Donor>) donorRepo.findAll(sort);
	}

	@Override
	public List<Events> getAllEvents() {
		return (List<Events>) eventRepo.findAll();
	}

	@Override
	public List<Donations> getAllDonations() {
		return (List<Donations>) donationRepo.findAll();
	}

	@Override
	public String registerUser(Admin newUser) {
		Optional<Admin> user = userRepository.findByEmail(newUser.getEmail());
		if (!user.isPresent()) {
			if (newUser.getPasscode().equals(passcode)) {
				userRepository.save(newUser);
				String subject = "Registration Successful";
				String body = "Dear Admin, congratulations on taking the lead in maintaining the Happy Faces website! Your dedication will make a positive impact on our mission to support and uplift the lives of those in need.";
				emailService.sendSimpleMail(newUser.getEmail(), subject, body);
				return "Success";
			} else {
				return "Enter Correct Passcode";
			}
		} else {
			return "You are an existing user. Please Login";
		}
	}

	@Override
	public boolean loginUser(String email, String password) {
		Optional<Admin> user = userRepository.findByEmail(email);
		if (user.isPresent()) {
			return user != null && user.get().getPassword().equals(password);
		} else {
			return false;
		}
	}
	
	public String verifyOrphanageDetails(OrphanageDetails orph) {
		
		List<OrphanageDetails> orphanage = orphDetails.findAllById(orph.getOrpId());
		for (OrphanageDetails detail:orphanage) 
		{
			detail.setVerificationStatus(orph.getVerificationStatus());
			orphDetails.save(detail);
			return "Verification Done";
		}
		return "";
	}
	
}
