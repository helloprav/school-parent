package org.school.userandsecurity.service.entity;

import java.io.Serializable;
import javax.persistence.*;

import java.util.List;

/**
 * The persistent class for the groups database table.
 * 
 */
@Entity
@Table(name = "Function")
@NamedQuery(name = "Function.findAll", query = "SELECT g FROM Function g")
public class Function extends AbstractCommonEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	private String functionName;

	@OneToMany(mappedBy = "functions")
	private List<GroupFunctions> groupFunctions;

	public List<GroupFunctions> getGroupFunctions() {
		return groupFunctions;
	}

	public void setGroupFunctions(List<GroupFunctions> groupFunctions) {
		this.groupFunctions = groupFunctions;
	}

	public String getFunctionName() {
		return functionName;
	}

	public void setFunctionName(String functionName) {
		this.functionName = functionName;
	}

	public Function() {
		// no argument constructor
	}

}