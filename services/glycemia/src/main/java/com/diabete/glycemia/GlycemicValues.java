package com.diabete.glycemia;

import java.time.LocalDateTime;

public class GlycemicValues {
	
	private long id;
	private LocalDateTime dateTime;
	private String insulinType;
	private int glycemia;
	private int carbohydrate;
	
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

}
