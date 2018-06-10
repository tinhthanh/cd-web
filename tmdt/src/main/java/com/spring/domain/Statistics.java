package com.spring.domain;

public class Statistics {
	private String name;
	private int value;
	public Statistics() {
		super();
	}
	public Statistics(String name, int value) {
		super();
		this.name = name;
		this.value = value;
	}
	@Override
	public String toString() {
		return "Statistics [name=" + name + ", value=" + value + "]";
	}
	public String getName() {
		return name;
	}
	public int getValue() {
		return value;
	}
	
	
}
