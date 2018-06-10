package com.spring.controller.rest;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.config.api.ApiMessage;
import com.spring.config.security.JwtTokenUtil;
import com.spring.domain.User;
import com.spring.domain.custom.UserInfo;
import com.spring.domain.json.PasswordReset;
import com.spring.domain.json.RegisterKey;
import com.spring.domain.json.UserCustom;
import com.spring.service.AES;
import com.spring.service.UserService;


@RestController
@RequestMapping(value = "/user")
public class UserRest {

	private static final Logger LOGGER = LoggerFactory.getLogger(UserRest.class);

	@Autowired
	private UserService userService;

	@Autowired
	private AES aes;

	@Autowired
	private JwtTokenUtil tokenHelper;

	@RequestMapping(value = "/info", method = RequestMethod.GET)
	public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
		String authToken = this.tokenHelper.getToken(request);
		if (authToken != null && this.tokenHelper.getUsernameFromToken(authToken) != null) {
			User user = userService.getUserByEmail(this.tokenHelper.getUsernameFromToken(authToken));
			return new ResponseEntity<Object>(user, HttpStatus.OK);

		} else {

			ApiMessage apiMessage = new ApiMessage(HttpStatus.UNAUTHORIZED, "token invalid");

			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}

	}

	@RequestMapping(value = "/{userID}", method = RequestMethod.GET)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getUserByID(@PathVariable("userID") String userID) {
		User user = userService.getUserByUserID(userID);
		if (user == null) {
			ApiMessage message = new ApiMessage(HttpStatus.NOT_FOUND, "user not found");
			return new ResponseEntity<Object>(message, message.getStatus());
		}
		return new ResponseEntity<User>(user, HttpStatus.OK);

	}

	/**
	 * send reset password key
	 * 
	 * @param email
	 * @return
	 */
	@RequestMapping(value = "/token_reset_password", method = RequestMethod.GET)
	public ResponseEntity<?> getResetPasswordToken(@RequestParam("email") String email) {
		ApiMessage apiMessage = null;
		if (!this.userService.checkEmailIsExists(email)) {
			apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "email not exist");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		try {
			this.userService.sendEmailResetPassword(email);
			apiMessage = new ApiMessage(HttpStatus.OK, "token has been sent");
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
		return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
	}

	/**
	 * change register status with key
	 * 
	 * @param key
	 * @return
	 */
	@RequestMapping(value = "/register_status", method = RequestMethod.PATCH)
	public ResponseEntity<?> enableUserRegister(@RequestBody RegisterKey key) {
		LOGGER.info(key.toString());
		String userIDDecrypt = aes.decrypt(key.getKey());
		LOGGER.info(userIDDecrypt);
		if (!userService.checkUserIdIsExists(userIDDecrypt)) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "cant find userID from URL");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		// get old use's status
		User user = userService.getUserByUserID(userIDDecrypt);
		Integer oldStatus = user.getStatus();
		// update user's status
		int numberOfRow = this.userService.changeUserStatus(userIDDecrypt, 1);
		// get new user's status before updated
		User user2 = userService.getUserByUserID(userIDDecrypt);
		Integer newStatus = user2.getStatus();
		if (oldStatus != newStatus && numberOfRow > 0) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.OK, "Account activation is successful");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		} else {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.ACCEPTED, "account has been activated before");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
	}

	/**
	 * create user
	 * 
	 * @param userCustom
	 * @return
	 */

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> createUser(@RequestBody UserCustom userCustom) {
		boolean resultOfCreate = false;
		if (userCustom == null) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.BAD_REQUEST, "request body is null");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		try {
			if (userService.checkEmailIsExists(userCustom.getEmail())) {
				ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "email is exists");
				return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
			}
			resultOfCreate = userService.register(userCustom.getUserName(), userCustom.getEmail(),
					userCustom.getPassword()) > 0;

		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
		if (resultOfCreate) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.ACCEPTED, "registration success");
			return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
		} else {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.FORBIDDEN, "user created failed");
			return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
		}

	}

	/**
	 * reset password
	 * 
	 * @param passwordReset
	 * @return
	 */
	@RequestMapping(value = "/password_reset", method = RequestMethod.PATCH)
	public ResponseEntity<?> resetPassword(@RequestBody PasswordReset passwordReset) {

		Map<String, Object> decryptKey = Collections.emptyMap();
		try {
			decryptKey = this.userService.decryptPasswordResetToken(passwordReset.getKey());

			String userID = (String) decryptKey.get("userId");
			// time send mail
			LocalDateTime dateTime = (LocalDateTime) decryptKey.get("dateTimeCreateToken");
			// time from sent mail and 15 minutes
			LocalDateTime newDateTime = dateTime.plusMinutes(15);

			// check key reset password is exists
			if (!this.userService.checkResetKeyIsExists(userID, passwordReset.getKey())) {
				ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "key reset not found");
				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			}

			// check password reset key is expired
			if (LocalDateTime.now().isBefore(newDateTime)) {
				// change password
				this.userService.changePassWord(userID, passwordReset.getNewPassword());
				// remove reset password key
				this.userService.removeKeyReset(userID, passwordReset.getKey());
				ApiMessage apiMessage = new ApiMessage(HttpStatus.OK, "change password succeed");
				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			} else {
				// delete key has expired
				this.userService.removeKeyReset(userID, passwordReset.getKey());
				ApiMessage apiMessage = new ApiMessage(HttpStatus.FORBIDDEN, "key has expired");
				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			}
			// String dateCreateKey = decryptKey.get("dateTimeCreateToken").toString();
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			ApiMessage apiMessage = new ApiMessage(HttpStatus.FORBIDDEN, "reset key is invalid");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}

	}

	@RequestMapping(value = "/info/{userID}", method = RequestMethod.GET)
	public ResponseEntity<?> getUserInfo(@PathVariable("userID") String userID) {
		Optional<UserInfo> userInfo = this.userService.getUserInfo(userID);
		if (!userInfo.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "user not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		} else {

			return new ResponseEntity<Object>(userInfo.get(), HttpStatus.OK);
		}
	}


	
}
