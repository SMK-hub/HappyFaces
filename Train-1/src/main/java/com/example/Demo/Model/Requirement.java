package com.example.Demo.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Requirements")
public class Requirement {

	@Id
	private String id;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	private String need;
	private String priority;
	
	public Requirement() {
		super();
	}
	public Requirement(String need, String priority) {
		super();
		this.need = need;
		this.priority = priority;
	}
	@Override
	public String toString() {
		return "Requirement [need=" + need + ", priority=" + priority + "]";
	}
	public String getNeed() {
		return need;
	}
	public void setNeed(String need) {
		this.need = need;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	
}
