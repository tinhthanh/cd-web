package com.spring.service;

import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import com.spring.config.paypal.PaypalPaymentIntent;
import com.spring.config.paypal.PaypalPaymentMethod;

public interface PaypalService {
	public Payment createPayment(Double total, String currency, PaypalPaymentMethod method, PaypalPaymentIntent intent,
			String description, String cancelUrl, String successUrl);

	public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException;
}
