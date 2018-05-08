package org.school.userandsecurity.rest.controller;

import org.junit.Before;
import org.openframework.common.rest.constants.ApplicationConstants;
import org.openframework.common.rest.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class BaseControllerTest {

	public static final String MORE_THAN_FIFTY_CHAR_LONG_STRING = "org.springframework.web.util.NestedServletException";
	@Autowired
	protected WebApplicationContext ctx;
	protected MockMvc mockMvc;

	static {
		System.setProperty(ApplicationConstants.CONFIG_PATH_PROPERTY_NAME,
				"D:\\Work\\WS\\WS_SHOP\\school-parent\\school-user-security\\src\\main\\resources\\env-config\\dev");
	}

	@Before
	public void setUpBase() {
		System.out.println("-----------------------------------------------------");
		this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx).build();
	}

	public static final String SUPPORTED_CONTENT_TYPE = MediaType.APPLICATION_JSON_VALUE;

	public static String saveRequestJsonString(UserVO userVO) {
		StringBuilder sb = new StringBuilder().append("{\n ");
		if (null != userVO.getFirstName()) {
			sb.append("  \"firstName\": \"" + userVO.getFirstName() + "\" ");
		}
		if (null != userVO.getDescription()) {
			if (sb.toString().endsWith(" ")) {
				sb.append(",\n ");
			}
			sb.append("  \"description\": \"" + userVO.getDescription() + "\" ");
		}
		sb.append("}");
		return sb.toString();
		// return "{\n" + " \"name\": \"" + ad.getName() + "\",\n" + " \"description\":
		// \"" + ad.getDescription()+ "\"\n" + "}";
	}

	public UserVO createVO(String pcName) {
		UserVO userVO = new UserVO();
		userVO.setFirstName("Praveen Kumar");
		userVO.setLastName("Mishra");
		userVO.setAdmissionNo(20000172L);
		userVO.setEmail("praveen@email.com");
		userVO.setGender("male");
		userVO.setMobile("9900990099");
		userVO.setPhone("+91 80 4463 1280");
		userVO.setPassword("secret_password".toCharArray());
		userVO.setRole("student");
		userVO.setStatus("active");
		userVO.setUserID(1L);
		userVO.setIsValid(true);
		userVO.setDescription("This is a very good boy");
		return userVO;
	}

	public String convertVoToJsonString(Object obj) {

		String jsonBody = "";
		ObjectMapper mapper = new ObjectMapper();
		try {
			jsonBody = mapper.writeValueAsString(obj);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		System.out.println("jsonBody: " + jsonBody );
		return jsonBody;
	}
}
