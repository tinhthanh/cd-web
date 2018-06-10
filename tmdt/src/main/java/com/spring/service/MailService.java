package com.spring.service;

import java.util.List;

public interface MailService {

	
	public void sendMail (List<String> to,String subject,String body);
}
