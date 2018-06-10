package com.spring.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.spring.domain.User;
import com.spring.domain.UserPrincipal;
import com.spring.service.UserService;

@Service
public class UserDetailsServiceImp implements UserDetailsService {
	

	@Autowired
	private UserService userService;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userService.getUserByEmail(email);
		if (user == null) {
			
			throw new UsernameNotFoundException(email);
		} else {

			return new UserPrincipal(user);
		}
	}

}
