package com.spring.service;

import com.google.api.services.drive.model.File;

public interface GoogleDriveApiService {
	/**
	 * 
	 * @param filePath file name on host
	 * @param folderID ID folder on google drive
	 * @param mimeType mine type of google drive
	 * @return
	 */
	public File upLoadFile(String fileName,String filePath,String folderID,String mimeType);
}
