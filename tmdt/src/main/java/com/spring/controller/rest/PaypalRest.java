package com.spring.controller.rest;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import com.spring.config.api.ApiMessage;
import com.spring.config.paypal.PaypalPaymentIntent;
import com.spring.config.paypal.PaypalPaymentMethod;
import com.spring.config.security.JwtTokenUtil;
import com.spring.domain.TransactionHistory;
import com.spring.domain.User;
import com.spring.domain.json.PayInfo;
import com.spring.service.CurrencyService;
import com.spring.service.PaypalService;
import com.spring.service.TransactionHistoryService;
import com.spring.service.UserService;

@Controller
@RequestMapping(value = "/")
public class PaypalRest {

	private static final Logger LOGGER = LoggerFactory.getLogger(PaypalRest.class);
	@Value("${front_end.scheme}")
	private String scheme;
	@Value("${front_end.server_name}")
	private String serverName;

	@Value("${front_end.server_port}")
	private String serverPort;
	@Value("${front_end.nap_the}")
	private String paySuccessURL;

	public static final String PAYPAL_SUCCESS_URL = "pay/success";
	public static final String PAYPAL_CANCEL_URL = "pay/cancel";
	@Autowired
	private PaypalService paypalService;
	@Autowired
	private TransactionHistoryService transactionHistoryService;
	@Autowired
	private CurrencyService currencyService;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	@Autowired
	private UserService userService;

	@RequestMapping(value = "pay", method = RequestMethod.POST)
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> pay(HttpServletRequest request, @RequestBody PayInfo payInfo) {
		
		
		String authToken = jwtTokenUtil.getToken(request);
		User user = userService.getUserByEmail(jwtTokenUtil.getUsernameFromToken(authToken));
		
		
		double newUSDAmount = this.currencyService.currencyConvert(payInfo.getTotal(), "VND", "USD");
		payInfo.setTotal(newUSDAmount);
		
		
		String cancelUrl = this.scheme + "://" + this.serverName + ":" + this.serverPort + paySuccessURL;
		String successUrl = this.scheme + "://" + this.serverName + ":" + this.serverPort + paySuccessURL;
		if (payInfo.getTotal() < 0) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.BAD_REQUEST, "total must be greater than 0");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		Payment payment = paypalService.createPayment(payInfo.getTotal(), "USD", PaypalPaymentMethod.paypal,
				PaypalPaymentIntent.sale, payInfo.getPayDecription(), cancelUrl, successUrl);

		for (Links links : payment.getLinks()) {
			if (links.getRel().equals("approval_url")) {
				String link = links.getHref();
				String tokenParam = "token=";
				String token =link.substring(link.indexOf(tokenParam) + tokenParam.length());
				this.userService.saveKey(user.getUserID(), token);
				ApiMessage apiMessage = new ApiMessage(HttpStatus.OK, links.getHref());
				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			}
		}
		ApiMessage apiMessage = new ApiMessage(HttpStatus.FORBIDDEN, "transaction failure");
		return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
	}

	@RequestMapping(method = RequestMethod.GET, value = PAYPAL_SUCCESS_URL)
	@PreAuthorize("hasRole('ROLE_USER')")

	public ResponseEntity<?> successPay(@RequestParam("paymentId") String paymentId,
			@RequestParam("PayerID") String payerId,@RequestParam("token") String token , HttpServletRequest request) {
		Payment payment = null;
		String authToken = this.jwtTokenUtil.getToken(request);
		User user = userService.getUserByEmail(this.jwtTokenUtil.getUsernameFromToken(authToken));
		
		if(!this.userService.checkResetKeyIsExists(user.getUserID(), token)) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "paypal token already used");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		
		try {
			payment = paypalService.executePayment(paymentId, payerId);
		} catch (PayPalRESTException e) {
			LOGGER.error(e.getMessage());
			ApiMessage apiMessage = new ApiMessage(HttpStatus.FORBIDDEN, "transaction failure");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		
		Map<String, Object> result = new HashMap<>();
		result.put("paymentId", payerId);
		result.put("payerId", payerId);
		if (payment.getState().equals("approved")) {
			Double total = Double.valueOf(payment.getTransactions().get(0).getAmount().getTotal());
			Double score = 
					(this.currencyService.moneyToScore(this.currencyService.currencyConvert(total, "USD", "VND")));
			if (authToken != null && this.jwtTokenUtil.getUsernameFromToken(authToken) != null) {
				this.userService.addScore(user.getUserID(), score);
				String transactionHistoryID = this.transactionHistoryService.inserTransactionHistory("NT", 0, score,
						user.getUserID(), "Nạp vào tài khoản" + user.getEmail() + " " + score + " điểm");
				Optional<TransactionHistory> th = transactionHistoryService
						.getTransactionHistoryByID(transactionHistoryID);

				result.put("transactionHistory", th.get());
				result.put("total", total);
				result.put("score", score);

				this.userService.removeKeyReset(user.getUserID(), token);
				
				return new ResponseEntity<Object>(result, HttpStatus.OK);
			} else {

				ApiMessage apiMessage = new ApiMessage(HttpStatus.UNAUTHORIZED, "token invalid");

				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			}

		}
		ApiMessage apiMessage = new ApiMessage(HttpStatus.FORBIDDEN, "failed");
		return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
	}
	@RequestMapping(value = "users/currencyconverterapi/{from}/{to}", method = RequestMethod.GET)
	public ResponseEntity<?> currencyconverterapi(@PathVariable("from") String from, @PathVariable("to") String to) {
		 Map<String, Double>  map = new HashMap<>();
		 map.put("val", this.currencyService.getRate(from, to));
		 return  new ResponseEntity<Object>(map,  HttpStatus.OK ) ; 
		
	}
}
