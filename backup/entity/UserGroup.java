package org.school.userandsecurity.service.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the usergroups database table.
 * 
 */
@Entity
@Table(name="UserGroups")
@NamedQuery(name="UserGroup.findAll", query="SELECT u FROM UserGroup u")
public class UserGroup extends AbstractCommonEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	//bi-directional many-to-one association to Group
	@ManyToOne
	@JoinColumn(name="GroupID")
	private Group group;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="UserID")
	private User user;

	public UserGroup() {
		super();
	}

	public Group getGroup() {
		return this.group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	public synchronized User getUser() {
		return user;
	}

	public synchronized void setUser(User user) {
		this.user = user;
	}

}