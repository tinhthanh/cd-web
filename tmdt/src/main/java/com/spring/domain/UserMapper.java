package com.spring.domain;

public class UserMapper {
	private String email;
	private String password;
	public UserMapper(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}
	
	public UserMapper() {
		super();
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "UserMapper [email=" + email + ", password=" + password + "]";
	}
	

}
