package com.example.Demo.AdminServices;

import java.util.List;
import java.util.Optional;

import jdk.jfr.Event;
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

import javax.swing.text.html.Option;

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
	private OrphanageDetailsRepository orphanageDetailsRepository;
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

	@Override
	public Optional<OrphanageDetails> getOrphanageDetailByOrphanageId(String orpId) {
		return orphanageDetailsRepository.findByOrphanageId(orpId);
	}

	@Override
	public String verifyOrphanageDetails(OrphanageDetails orphanageDetails) {
		Optional<OrphanageDetails> orphanage = orphanageDetailsRepository.findByOrphanageId(orphanageDetails.getOrpId());
		if(orphanage.isPresent())
		{
			orphanage.get().setVerificationStatus(orphanageDetails.getVerificationStatus());
			orphanageDetailsRepository.save(orphanage.get());
			return "Orphanage Verification Done";
		}
		return "Orphanage Verification not Done";
	}
	@Override
	public String verifyEventDetails(Events events){
		Optional<Events> event=eventRepo.findById(events.getId());
		if(event.isPresent())
		{
			event.get().setVerificationStatus(events.getVerificationStatus());
			eventRepo.save(event.get());
			return "Event Verification Done";
		}
		return "Event Verification not done";
	}

	@Override
	public Orphanage getOrphanageById(String id){
		Optional<Orphanage> orphanage =orphanageRepo.findById(id);
		return orphanage.orElse(null);
	}
	@Override
	public Donor getDonorById(String id){
		Optional<Donor> donor=donorRepo.findById(id);
		return donor.orElse(null);
	}
	@Override
	public Admin getAdminById(String id){
		Optional<Admin> admin=adminRepo.findById(id);
		return admin.orElse(null);
	}
	@Override
	public Events getEventById(String id){
		Optional<Events> event=eventRepo.findById(id);
		return event.orElse(null);
	}
	@Override
	public List<Events> getEventsByOrphanageId(String id){
        return eventRepo.getEventsByOrphanageId(id);
	}
	@Override
	public Donations getDonationById(String id){
		Optional<Donations> donation=donationRepo.findById(id);
		return donation.orElse(null);
	}

	@Override
	public List<Donations> getDonationsByOrphanageId(String id) {
		return donationRepo.getDonationsByOrphanageId(id);
	}

	@Override
	public List<Donations> getDonationsByDonorId(String id) {
		return donationRepo.getDonationsDonorId(id);
	}



}
