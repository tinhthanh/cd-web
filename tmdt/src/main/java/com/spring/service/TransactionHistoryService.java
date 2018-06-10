package com.spring.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.spring.domain.TransactionForm;
import com.spring.domain.TransactionHistory;

public interface TransactionHistoryService {
	public Map<String, Object> getAllTransactionHistory(int page, int size);

	public Optional<TransactionHistory> getTransactionHistoryByID(String transactionHistoryID);

	public Map<String, Object> getTransactionHistoryByTraders(int page, int size, String userID);

	public String inserTransactionHistory(String transactionFormID, double debt, double balance, String userID,
			String transactionDescription);

	public List<TransactionForm> getListTransactionForm();

	public Map<String, Object> getTransactionHistoryByTradersAndTransactionID(int page, int size, String userID,
			String transactionID);

}
