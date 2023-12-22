package com.example.Demo.EmailServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
	
	
	
	@Autowired private JavaMailSender javaMailSender;
	
	@Value("${spring.mail.username}")private String sender;
	
	@Override
	public String sendSimpleMail(String email, String subject, String body) 
	{	
		try 
		{
			SimpleMailMessage mailMessage = new SimpleMailMessage();
			mailMessage.setFrom(sender);
			mailMessage.setTo(email);
			mailMessage.setSubject(subject);
			mailMessage.setText(body);
			
			javaMailSender.send(mailMessage);
			return "Mail Send Successfully";
			
		}
		catch (Exception e) 
		{
			return "Error while Sending Mail";
		}
		
	}

}
