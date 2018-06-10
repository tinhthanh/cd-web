package com.spring.service.imp;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.domain.TransactionForm;
import com.spring.domain.TransactionHistory;
import com.spring.repository.TransactionHistoryRepository;

import com.spring.service.TransactionHistoryService;


@Service
public class TransactionHistoryServiceImp implements TransactionHistoryService {
	@Autowired
	private TransactionHistoryRepository transactionHistoryRepository;

	@Override
	public Map<String, Object> getAllTransactionHistory(int page, int size) {
		return this.transactionHistoryRepository.getAllTransactionHistory(page, size);
	}

	@Override
	public Optional<TransactionHistory> getTransactionHistoryByID(String transactionHistoryID) {
		return this.transactionHistoryRepository.getTransactionHistoryByID(transactionHistoryID);
	}

	@Override
	public Map<String, Object> getTransactionHistoryByTraders(int page, int size, String userID) {
		return this.transactionHistoryRepository.getTransactionHistoryByTraders(page, size, userID);
	}

	@Override
	public String inserTransactionHistory(String transactionFormID, double debt, double balance, String userID,
			String transactionDescription) {
		return this.transactionHistoryRepository.inserTransactionHistory(transactionFormID, debt, balance, userID,
				transactionDescription);
	}

	@Override
	public List<TransactionForm> getListTransactionForm() {
		return this.transactionHistoryRepository.getTransactionForm();
	}

	@Override
	public Map<String, Object> getTransactionHistoryByTradersAndTransactionID(int page, int size, String userID,
			String transactionID) {
		return this.transactionHistoryRepository.getTransactionHistoryByTradersAndTransactionID(page, size, userID,
				transactionID);
	}
}
