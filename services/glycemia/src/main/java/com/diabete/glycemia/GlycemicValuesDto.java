package com.diabete.glycemia;

import java.time.LocalDateTime;

public class GlycemicValuesDto {
	
	private long id;
	private LocalDateTime dateTime;
	private String insulinType;
	private int glycemia;
	private int carbohydrate;
	private int dose;
	private long userId;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	public LocalDateTime getDateTime() {
		return dateTime;
	}
	
	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}
	
	public String getInsulinType() {
		return insulinType;
	}
	
	public void setInsulinType(String insulinType) {
		this.insulinType = insulinType;
	}
	
	public int getGlycemia() {
		return glycemia;
	}
	
	public void setGlycemia(int glycemia) {
		this.glycemia = glycemia;
	}
	
	public int getCarbohydrate() {
		return carbohydrate;
	}
	
	public void setCarbohydrate(int carbohydrate) {
		this.carbohydrate = carbohydrate;
	}
	
	public long getUserId() {
		return userId;
	}
	
	public void setUserId(long userId) {
		this.userId = userId;
	}
	
	public int getDose() {
		return dose;
	}
	
	public void setDose(int dose) {
		this.dose = dose;
	}
	
}
