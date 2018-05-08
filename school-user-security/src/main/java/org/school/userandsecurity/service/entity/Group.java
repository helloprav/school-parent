package org.school.userandsecurity.service.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;


/**
 * The persistent class for the groups database table.
 * 
 */
@Entity
@Table(name="GROUPS")
@NamedQuery(name="Group.findAll", query="SELECT g FROM Group g")
public class Group extends AbstractCommonEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name = "GROUP_NAME", length = 50)
	private String groupName;

	@OneToMany(mappedBy="group" ,fetch=FetchType.EAGER)
	private List<GroupFunction> groupFunctions;

	//bi-directional many-to-one association to UserGroup
	@OneToMany(mappedBy="group")
	private List<UserGroup> usergroups;

	public Group() {
		// no argument constructor
	}

	public String getGroupName() {
		return this.groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	
	public List<GroupFunction> getGroupFunctions() {
		return groupFunctions;
	}

	public void setGroupFunctions(List<GroupFunction> groupFunctions) {
		this.groupFunctions = groupFunctions;
	}

	public List<UserGroup> getUsergroups() {
		return this.usergroups;
	}

	public void setUsergroups(List<UserGroup> usergroups) {
		this.usergroups = usergroups;
	}

	public UserGroup addUsergroup(UserGroup usergroup) {
		getUsergroups().add(usergroup);
		usergroup.setGroup(this);

		return usergroup;
	}

	public UserGroup removeUsergroup(UserGroup usergroup) {
		getUsergroups().remove(usergroup);
		usergroup.setGroup(null);

		return usergroup;
	}

}