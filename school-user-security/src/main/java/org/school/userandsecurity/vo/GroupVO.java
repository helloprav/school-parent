/**
 * 
 */
package org.school.userandsecurity.vo;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.openframework.common.rest.vo.BaseVO;

/**
 * @author Java Developer
 *
 */
public class GroupVO extends BaseVO {

	private Long id;

	@NotNull(message = "error.NotNull.name")
	@Length(min=5, max=50, message="error.Length.name")
	private String name;

	//TODO check why this @Size is not working (Ref: https://docs.jboss.org/hibernate/validator/5.1/reference/en-US/html/chapter-message-interpolation.html#section-interpolation-with-message-expressions)
	//@Size(min = 2, max = 14, message = "The license plate '${validatedValue}' must be between {min} and {max} characters long")
//	@NotBlank(message = "Task description must not be blank!")
	@NotNull(message = "NotNull.Description")
	@Length(min=5, max=50, message="The length should be between 5 and 50 characters long")
	private String description;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


}
