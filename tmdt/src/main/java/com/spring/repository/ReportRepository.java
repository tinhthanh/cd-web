package com.spring.repository;

import java.util.Map;

public interface ReportRepository {
	public Map<String , Object> statisticsByTopic(int rowsLimit) ;

	public Map<String, Object> statisticsByGuest(int rowsLimit);

	public Map<String, Object> statisticsByCource(int rowsLimit);


}
