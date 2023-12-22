package com.example.Demo.OrphanageServices;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Demo.EmailServices.EmailService;
import com.example.Demo.Model.Orphanage;
import com.example.Demo.Model.OrphanageDetails;
import com.example.Demo.Model.OrphanageDetails.VerificationStatus;
import com.example.Demo.Repository.OrphanageDetailsRepository;
import com.example.Demo.Repository.OrphanageRepository;

@Service
public class OrphanageServiceImpl implements OrphanageService {

	@Autowired
	private OrphanageRepository userRepository;
	@Autowired
	private OrphanageDetailsRepository detailRepository;
	@Autowired
	private EmailService emailService;

	public String registerUser(Orphanage newUser) {
		Optional<Orphanage> user = userRepository.findByEmail(newUser.getEmail());

		if (!user.isPresent()) {
			userRepository.save(newUser);
			String subject = "Registration Successful";
			String body = "Dear " + newUser.getName()
					+ ", thank you for registering with Happy Faces! Your commitment to our cause brings hope and happiness to the lives of many. Welcome to our compassionate community!";
			emailService.sendSimpleMail(newUser.getEmail(), subject, body);
			return "Success";
		} else {
			return "You are an existing user.\nPlease Login";
		}
	}

	@Override
	public boolean loginUser(String email, String password) {
		Optional<Orphanage> user = userRepository.findByEmail(email);
		if (user.isPresent()) {
			return user != null && user.get().getPassword().equals(password);
		} else {
			return false;
		}
	}

	@Override
	public String updateDetails(OrphanageDetails details) {
		details.setVerificationStatus(VerificationStatus.NOT_VERIFIED);
		detailRepository.save(details);
		return "Updated Successfully";
	}

	@Override
	public List<OrphanageDetails> getDetailById(String orpId) {
		return detailRepository.findAllById(orpId);
	}

}
