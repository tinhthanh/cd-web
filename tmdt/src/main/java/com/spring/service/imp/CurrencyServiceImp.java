package com.spring.service.imp;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.service.CurrencyService;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

@Service
public class CurrencyServiceImp implements CurrencyService {

	private static final Logger LOGGER = LoggerFactory.getLogger(CurrencyServiceImp.class);

	@Value("${vnd_to_score}")
	private Double vndToScore;
//	private static final double USD_VND = 22000;

	@Override
	public double moneyToScore(double amount) {
		return amount / vndToScore;
	}

	@Override
	public double currencyConvert(double amount, String from, String to) {
		return this.getRate(from, to) * amount;
	}

	@SuppressWarnings("unchecked")
	@Override
	public double getRate(String from, String to) {
		String tranfer = from + "_" + to;
		double rate = 0;
		Client client = Client.create();
		WebResource webResource = client
				.resource("https://free.currencyconverterapi.com/api/v5/convert?q=" + tranfer + "&compact=y");
		ClientResponse response = webResource.get(ClientResponse.class);

		if (response.getStatus() != 200) {
			LOGGER.error("Failed : HTTP error code : " + response.getStatus());
		}

		String output = response.getEntity(String.class);
		try {
			Map<String, Object> result = new ObjectMapper().readValue(output, HashMap.class);

			Map<String, Object> a = (Map<String, Object>) result.get(tranfer);
			rate = Double.valueOf(  a.get("val").toString());
			
			System.err.println(rate);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
		return rate;
	}

}
