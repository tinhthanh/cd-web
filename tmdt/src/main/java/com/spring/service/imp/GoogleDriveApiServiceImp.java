package com.spring.service.imp;

import java.net.URL;
import java.nio.file.Paths;
import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.spring.service.GoogleDriveApiService;

@Service
public class GoogleDriveApiServiceImp implements GoogleDriveApiService {

	private static final Logger LOGGER = LoggerFactory.getLogger(GoogleDriveApiServiceImp.class);

	@Value("${google.service_account_email}")
	private String serviceAccountEmail;
	@Value("${google.application_name}")
	private String applicationName;
	
	@Value("${google.service_account_key}")
	private String serviceAccountKey;

	public Drive getDriveService() {
		Drive service = null;
		try {

			URL resource = GoogleDriveApiServiceImp.class.getResource("/"+this.serviceAccountKey);
			java.io.File key = Paths.get(resource.toURI()).toFile();
			HttpTransport httpTransport = new NetHttpTransport();
			JacksonFactory jsonFactory = new JacksonFactory();

			GoogleCredential credential = new GoogleCredential.Builder().setTransport(httpTransport)
					.setJsonFactory(jsonFactory).setServiceAccountId(serviceAccountEmail)
					.setServiceAccountScopes(Collections.singleton(DriveScopes.DRIVE))
					.setServiceAccountPrivateKeyFromP12File(key).build();
			service = new Drive.Builder(httpTransport, jsonFactory, credential).setApplicationName(applicationName)
					.setHttpRequestInitializer(credential).build();
		} catch (Exception e) {
			LOGGER.error(e.getMessage());

		}

		return service;

	}

	@Override
	public File upLoadFile(String fileName, String filePath, String folderID, String mimeType) {
		File file = new File();
		try {
			java.io.File fileUpload = new java.io.File(filePath);
			com.google.api.services.drive.model.File fileMetadata = new com.google.api.services.drive.model.File();
			fileMetadata.setMimeType(mimeType);
			fileMetadata.setName(fileName);
			fileMetadata.setParents(Collections.singletonList(folderID));
			com.google.api.client.http.FileContent fileContent = new FileContent(mimeType, fileUpload);
			file = getDriveService().files().create(fileMetadata, fileContent)
					.setFields("id,webContentLink,webViewLink").execute();
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
		return file;
	}

}
