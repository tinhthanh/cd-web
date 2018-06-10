package com.spring.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserPrincipal implements UserDetails {

	/**
	 * 
	 */

	private static final long serialVersionUID = 1L;
	private User user;

	public UserPrincipal(User user) {
		super();
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = new ArrayList<>();
		List<Role> listOfPermission = this.user.getPermission();
		if (listOfPermission.isEmpty()) {
			authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
		} else {
			for (Role role : listOfPermission) {
				authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
			}
		}
		return authorities;
	}

	@Override
	public String getPassword() {
		return this.user.getPassword();
	}

	@Override
	public String getUsername() {
		return this.user.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return this.user.getStatus() != 2 && this.user.getStatus() != 0;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.user.getStatus() != 2 && this.user.getStatus() != 0;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return this.user.getStatus() != 2 && this.user.getStatus() != 0;
	}

	@Override
	public boolean isEnabled() {
		return this.user.getStatus() == 1;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
