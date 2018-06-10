package com.spring.service.imp;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.spring.service.AES;

@Service
public class AESImp implements AES {

	private static final Logger LOGGER = LoggerFactory.getLogger(AESImp.class);

	@Value("${aes.key}")
	private String key;
	@Value("${aes.initVector}")
	private String initVector;

	public String encrypt(String key, String initVector, String value) {
		try {
			IvParameterSpec iv = new IvParameterSpec(initVector.getBytes("UTF-8"));
			SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
			cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);

			byte[] encrypted = cipher.doFinal(value.getBytes());

			return DatatypeConverter.printBase64Binary(encrypted);
		} catch (Exception ex) {
			LOGGER.error(ex.getMessage());
		}
		return null;

	}

	public String decrypt(String key, String initVector, String encrypted) {
		try {
			IvParameterSpec iv = new IvParameterSpec(initVector.getBytes("UTF-8"));
			SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
			cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);

			byte[] original = cipher.doFinal(DatatypeConverter.parseBase64Binary(encrypted));

			return new String(original);
		} catch (Exception ex) {
			LOGGER.error(ex.getMessage());
		}
		return null;
	}

	@Override
	public String encrypt(String value) {
		String encryptString = encrypt(this.key, this.initVector, value);
		// delete == in base64
		return encryptString.substring(0, encryptString.length() - 2);
	}

	@Override
	public String decrypt(String value) {
		// add == for base64
		String newValue = value+"==";
		return this.decrypt(this.key, this.initVector, newValue);
	}

}
