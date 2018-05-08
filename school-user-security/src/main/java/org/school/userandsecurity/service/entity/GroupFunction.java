package org.school.userandsecurity.service.entity;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The persistent class for the groups database table.
 * 
 */
@Entity
@Table(name = "GROUP_FUNCTION")
@NamedQuery(name = "GroupFunction.findAll", query = "SELECT g FROM GroupFunction g")
public class GroupFunction extends AbstractCommonEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name="FUNCTION_ID")
	private Function function;

	@ManyToOne
	@JoinColumn(name="GROUP_ID")
	private Group group;

	public Function getFunction() {
		return function;
	}

	public void setFunction(Function functions) {
		this.function = functions;
	}

	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	public GroupFunction() {
		// no argument constructor
	}


}
