package org.school.userandsecurity.service.as.impl;

import java.util.Optional;

import org.openframework.commons.domain.exceptions.EntityNotFoundException;
import org.school.userandsecurity.service.entity.User;
import org.school.userandsecurity.service.repository.UserRepository;

public class BaseASImpl {

	public User returnIfEntityExists(Long id, UserRepository baseRepository) {

		Optional<User> user = baseRepository.findById(id);
		if (!user.isPresent()) {
			throw new EntityNotFoundException(String.format("Requested entity %s not found", id));
		} else {
			return user.get();
		}
	}

}
