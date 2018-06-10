package com.spring.controller.rest;

import java.io.IOException;
import java.security.Principal;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spring.config.api.ApiMessage;
import com.spring.config.security.DeviceProvider;
import com.spring.config.security.JwtTokenUtil;
import com.spring.config.security.UserTokenState;
import com.spring.domain.UserMapper;

@RestController
@RequestMapping(value = "/auth")
public class AuthenticationRest {
	@Autowired
	JwtTokenUtil tokenHelper;
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private DeviceProvider deviceProvider;

	@Autowired
	private UserDetailsService userDetailsService;

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody UserMapper authenticationRequest,
			HttpServletResponse response, Device device) throws AuthenticationException, IOException {

		final UserDetails userDetails;

		try {
			final Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
							authenticationRequest.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			// Reload password post-security so we can generate token
			userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());

		} catch (Exception e) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.FORBIDDEN, e.getMessage());
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}

		String jws = tokenHelper.generateToken(userDetails.getUsername(), device);
		int expiresIn = tokenHelper.getExpiredIn(device);
		// Add cookie to response
		response.addCookie(createAuthCookie(jws, expiresIn));
		// Return the token
		return ResponseEntity.ok(new UserTokenState(jws, expiresIn));
	}

	@RequestMapping(value = "/refresh", method = RequestMethod.GET)
	public ResponseEntity<?> refreshAuthenticationToken(HttpServletRequest request, HttpServletResponse response,
			Principal principal) {

		String authToken = tokenHelper.getToken(request);

		Device device = deviceProvider.getCurrentDevice(request);

		if (authToken != null && principal != null
				&& tokenHelper.validateToken(authToken, tokenHelper.getUsernameFromToken(authToken))) {

			// TODO check user password last update
			String refreshedToken = tokenHelper.refreshToken(authToken, device);
			int expiresIn = tokenHelper.getExpiredIn(device);

			// Add cookie to response
			response.addCookie(createAuthCookie(refreshedToken, expiresIn));

			return ResponseEntity.ok(new UserTokenState(refreshedToken, expiresIn));
		} else {
			// UserTokenState userTokenState = new UserTokenState();
			ApiMessage apiMessage = new ApiMessage(HttpStatus.FORBIDDEN, "token invalid");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			// return ResponseEntity.accepted().body(userTokenState);
		}
	}

	private Cookie createAuthCookie(String jwt, int expiresIn) {

		jwt = jwt.substring(7);
		Cookie authCookie = new Cookie(tokenHelper.AUTH_COOKIE, (jwt));
		authCookie.setPath("/");
		authCookie.setHttpOnly(true);
		authCookie.setMaxAge(expiresIn);
		return authCookie;
	}
}
