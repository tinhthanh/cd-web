package com.spring.domain.json;

public class PasswordReset {
	private String newPassword;
	private String key;
	public PasswordReset(String newPassword, String key) {
		super();
		this.newPassword = newPassword;
		this.key = key;
	}
	public PasswordReset() {
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	

}
