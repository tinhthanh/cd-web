package com.spring.service.imp;

import com.spring.service.MailService;
import microsoft.exchange.webservices.data.core.ExchangeService;
import microsoft.exchange.webservices.data.core.enumeration.misc.ExchangeVersion;
import microsoft.exchange.webservices.data.credential.ExchangeCredentials;
import microsoft.exchange.webservices.data.credential.WebCredentials;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.List;

@Service
public class MailServiceImp implements MailService {

	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass().getName());

	@Autowired
	private JavaMailSender javaMailSender;

	@Value("${server.mail}")
	private String serverMail;

	@Value("${server.mail.password}")
	private String serverMailPassword;

	@Override
	public void sendMail(List<String> to, String subject, String body) {




     try{

		 MimeMessage msg = javaMailSender.createMimeMessage();

		 // true = multipart message
		 MimeMessageHelper helper = new MimeMessageHelper(msg, true);

		 helper.setTo((String[]) to.toArray());

		 helper.setSubject(subject);
		 helper.setText(body, true);
		 javaMailSender.send(msg);
	 }catch (Exception e) {
		 LOGGER.error(e.getMessage());
	 }
//		try {
//
//			EmailMessage emailMessage = new EmailMessage(getExChangeService());
//			MessageBody messageBody = new MessageBody();
//			messageBody.setBodyType(BodyType.HTML);
//			messageBody.setText(body);
//
//			emailMessage.setBody(messageBody);
//			emailMessage.setSubject(subject);
//
//			if (to != null) {
//				to.forEach(e -> {
//					try {
//						emailMessage.getToRecipients().add(e);
//					} catch (ServiceLocalException e1) {
//						LOGGER.error(e1.getMessage());
//					}
//				});
//			}
//			emailMessage.send();
//		} catch (Exception e) {
//			LOGGER.error(e.getMessage());
//		}

	}
}
