package com.spring.domain.json;

public class PaymentDonate {
	private String lessonID;
	private double amount;
	public PaymentDonate(String lessonID, double amount) {
		super();
		this.lessonID = lessonID;
		this.amount = amount;
	}
	public PaymentDonate() {
		super();
	}
	public String getLessonID() {
		return lessonID;
	}
	public void setLessonID(String lessonID) {
		this.lessonID = lessonID;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	@Override
	public String toString() {
		return "PaymentDonate [lessonID=" + lessonID + ", amount=" + amount + "]";
	}
	
	

}
