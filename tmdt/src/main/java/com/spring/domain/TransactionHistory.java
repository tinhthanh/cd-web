package com.spring.domain;

import java.time.LocalDateTime;

import com.spring.domain.custom.UserInfo;

public class TransactionHistory {
	private String transactionHistoryID;
	private LocalDateTime transactionDate;
	private TransactionForm transactionForm;
	private String transactionDescription;
	private Double debt;
	private Double balance;
	private	UserInfo traders;
	public TransactionHistory(String transactionHistoryID, LocalDateTime transactionDate,
			TransactionForm transactionForm, String transactionDescription, Double debt, Double balance,
			UserInfo traders) {
		super();
		this.transactionHistoryID = transactionHistoryID;
		this.transactionDate = transactionDate;
		this.transactionForm = transactionForm;
		this.transactionDescription = transactionDescription;
		this.debt = debt;
		this.balance = balance;
		this.traders = traders;
	}
	public TransactionHistory() {
		super();
	}
	public String getTransactionHistoryID() {
		return transactionHistoryID;
	}
	public void setTransactionHistoryID(String transactionHistoryID) {
		this.transactionHistoryID = transactionHistoryID;
	}
	public LocalDateTime getTransactionDate() {
		return transactionDate;
	}
	public void setTransactionDate(LocalDateTime transactionDate) {
		this.transactionDate = transactionDate;
	}
	public TransactionForm getTransactionForm() {
		return transactionForm;
	}
	public void setTransactionForm(TransactionForm transactionForm) {
		this.transactionForm = transactionForm;
	}
	public String getTransactionDescription() {
		return transactionDescription;
	}
	public void setTransactionDescription(String transactionDescription) {
		this.transactionDescription = transactionDescription;
	}
	public Double getDebt() {
		return debt;
	}
	public void setDebt(Double debt) {
		this.debt = debt;
	}
	public Double getBalance() {
		return balance;
	}
	public void setBalance(Double balance) {
		this.balance = balance;
	}
	public UserInfo getTraders() {
		return traders;
	}
	public void setTraders(UserInfo traders) {
		this.traders = traders;
	}
	@Override
	public String toString() {
		return "TransactionHistory [transactionHistoryID=" + transactionHistoryID + ", transactionDate="
				+ transactionDate + ", transactionForm=" + transactionForm + ", transactionDescription="
				+ transactionDescription + ", debt=" + debt + ", balance=" + balance + ", traders=" + traders + "]";
	}


	
}
