package com.spring.service.imp;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.spring.service.MailService;

import microsoft.exchange.webservices.data.core.ExchangeService;
import microsoft.exchange.webservices.data.core.enumeration.misc.ExchangeVersion;
import microsoft.exchange.webservices.data.core.enumeration.property.BodyType;
import microsoft.exchange.webservices.data.core.exception.service.local.ServiceLocalException;
import microsoft.exchange.webservices.data.core.service.item.EmailMessage;
import microsoft.exchange.webservices.data.credential.ExchangeCredentials;
import microsoft.exchange.webservices.data.credential.WebCredentials;
import microsoft.exchange.webservices.data.property.complex.MessageBody;

@Service
public class MailServiceImp implements MailService {

	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass().getName());

	@Value("${server.mail}")
	private String serverMail;

	@Value("${server.mail.password}")
	private String serverMailPassword;

	public ExchangeService getExChangeService() {
		ExchangeService service = new ExchangeService(ExchangeVersion.Exchange2010_SP2);
		ExchangeCredentials credentials = new WebCredentials(serverMail, serverMailPassword);
		service.setCredentials(credentials);
		try {
			service.autodiscoverUrl(serverMail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return service;
	}

	@Override
	public void sendMail(List<String> to, String subject, String body) {
		try {

			EmailMessage emailMessage = new EmailMessage(getExChangeService());
			MessageBody messageBody = new MessageBody();
			messageBody.setBodyType(BodyType.HTML);
			messageBody.setText(body);

			emailMessage.setBody(messageBody);
			emailMessage.setSubject(subject);

			if (to != null) {
				to.forEach(e -> {
					try {
						emailMessage.getToRecipients().add(e);
					} catch (ServiceLocalException e1) {
						LOGGER.error(e1.getMessage());
					}
				});
			}
			emailMessage.send();
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}

	}
}
