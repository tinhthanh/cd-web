package com.spring.domain.json;

public class PayInfo {
	private Double total;
	private String payDecription;

	public PayInfo(Double total, String payDecription) {
		super();
		this.total = total;
		this.payDecription = payDecription;
	}

	public PayInfo() {
		super();
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public String getPayDecription() {
		return payDecription;
	}

	public void setPayDecription(String payDecription) {
		this.payDecription = payDecription;
	}

	@Override
	public String toString() {
		return "PayInfo [total=" + total + ", payDecription=" + payDecription + "]";
	}

}
