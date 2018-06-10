package com.spring.service;

public interface CurrencyService {
	public double currencyConvert(double amount,String from, String to);
	public double moneyToScore(double amount);
	public double getRate(String from,String to);

}
