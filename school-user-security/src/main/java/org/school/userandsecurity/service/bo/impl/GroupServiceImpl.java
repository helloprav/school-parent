/**
 * 
 */
package org.school.userandsecurity.service.bo.impl;

import java.util.List;

import javax.inject.Inject;

import org.openframework.common.rest.service.impl.BaseServiceImpl;
import org.school.userandsecurity.service.adaptor.GroupAdaptor;
import org.school.userandsecurity.service.as.GroupAS;
import org.school.userandsecurity.service.bo.GroupService;
import org.school.userandsecurity.vo.GroupVO;
import org.springframework.stereotype.Service;


/**
 * @author Java Developer
 *
 */
@Service
public class GroupServiceImpl extends BaseServiceImpl implements GroupService {

	@SuppressWarnings("unused")
	@Inject
	private GroupAS productCategoryAS;

	@SuppressWarnings("unused")
	@Inject
	private GroupAdaptor productCategoryAdaptor;

	@Override
	public List<GroupVO> findGroups() {
		return null;
	}

	@Override
	public List<GroupVO> findGroupsByStatus(Boolean status) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Long createGroup(GroupVO groupVO) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<GroupVO> findGroupById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public GroupVO updateGroup(GroupVO group) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public GroupVO updateStatus(GroupVO groupVO) {
		// TODO Auto-generated method stub
		return null;
	}
}
