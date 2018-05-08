package org.school.userandsecurity.service.entity;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The persistent class for the groups database table.
 * 
 */
@Entity
@Table(name = "GroupFunctions")
@NamedQuery(name = "GroupFunctions.findAll", query = "SELECT g FROM GroupFunctions g")
public class GroupFunctions extends AbstractCommonEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name="functionId")
	private Function functions;

	@ManyToOne
	@JoinColumn(name="groupId")
	private Group group;

	public Function getFunctions() {
		return functions;
	}

	public void setFunctions(Function functions) {
		this.functions = functions;
	}

	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	public GroupFunctions() {
		// no argument constructor
	}

}
