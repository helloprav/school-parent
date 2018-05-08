package org.school.userandsecurity.service.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@MappedSuperclass
public class AbstractCommonEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CREATED_BY")
	private User createdBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CREATED_DATE", length = 19)
	private Date createdDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MODIFIED_BY")
	private User modifiedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "MODIFIED_DATE", length = 19)
	private Date modifiedDate;

	@Column(name = "IS_VALID")
	private boolean isValid;

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public boolean isValid() {
		return isValid;
	}

	public void setValid(boolean isValid) {
		this.isValid = isValid;
	}

	public synchronized Long getId() {
		return id;
	}

	public synchronized void setId(Long id) {
		this.id = id;
	}

	public synchronized User getCreatedBy() {
		return createdBy;
	}

	public synchronized void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public synchronized User getModifiedBy() {
		return modifiedBy;
	}

	public synchronized void setModifiedBy(User modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

}
