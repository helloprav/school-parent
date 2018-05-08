/**
 * 
 */
package org.school.userandsecurity.rest.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openframework.common.rest.vo.UserVO;
import org.school.userandsecurity.rest.config.TestMetadataWebConfig;
import org.school.userandsecurity.rest.controller.BaseControllerTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

/**
 * 
 * CRUD Operations:
 * 
 * 
 * @author pmis30
 *
 */
@TestMetadataWebConfig
@RunWith(SpringJUnit4ClassRunner.class)
public class RestAdviceAndExceptionHandlerTest extends BaseControllerTest {

	@Autowired
	private WebApplicationContext ctx;
	private MockMvc mockMvc;

	@Before
	public void setUp() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx).build();
	}

	@Test
	public void testInvalidRequestUrl_BadRequest400() throws Exception {
		mockMvc.perform(get("/cat/invalidUrl").accept("application/vnd.shop.app-v0.1+json")
				.contentType("application/vnd.shop.app-v0.1+json")).andExpect(status().isBadRequest())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	public void testInvalidRequestBody_BadRequest400() throws Exception {

		String requestBody = "{\r\n" + "  \"invalidProperty\": \"ProductTest.test\",\r\n"
				+ "  \"invalidDesc\": \"description\"\r\n" + "}";
		System.out.println("requestBody: " + requestBody);
		mockMvc.perform(post("/cat").content(requestBody).contentType("application/vnd.shop.app-v0.1+json"))
				.andExpect(status().isBadRequest()).andDo(MockMvcResultHandlers.print());
	}

	/**
	 * Update status http method should be PATCH, but is PUT
	 * 
	 * @throws Exception
	 */
	@Test
	public void testHttpMethod_MethodNotAllowed405() throws Exception {
		UserVO ad = createVO("UserControllerTest.testUpdateCategory()");
		String requestBody = saveRequestJsonString(ad);
		mockMvc.perform(put("/cat/4/status/true").param("uid", "1").accept("application/vnd.shop.app-v0.1+json")
				.content(requestBody)).andExpect(status().isMethodNotAllowed()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	public void testInvalidAcceptHeader_NotAcceptable406() throws Exception {
		mockMvc.perform(get("/cat").accept("application/vnd.shop.invalid.header")).andExpect(status().isNotAcceptable())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	public void testInvalidContentTypeHeader_UnsupportedMediaType415() throws Exception {

		UserVO ad = createVO("UserControllerTest.testCreateCategory()");
		String requestBody = saveRequestJsonString(ad);
		System.out.println("requestBody: " + requestBody);
		mockMvc.perform(post("/cat").content(requestBody).contentType("application/vnd.shop.invalid.header"))
				.andExpect(status().isUnsupportedMediaType()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	public void testFindCategoryById_throwsKeywordNotFoundException() throws Exception {
		mockMvc.perform(get("/cat/0").accept("application/vnd.shop.app-v0.1+json")).andExpect(status().isOk())
				.andDo(MockMvcResultHandlers.print()).andExpect(jsonPath("$.data").exists());
	}

	@Test
	public void testFindCategoryById_throwsApplicationValidationException() throws Exception {
		mockMvc.perform(get("/cat/-1").accept("application/vnd.shop.app-v0.1+json")).andExpect(status().isOk())
				.andDo(MockMvcResultHandlers.print()).andExpect(jsonPath("$.data").exists());
	}

	@Test
	public void testFindCategoryById_throwsServiceNotFoundException() throws Exception {
		mockMvc.perform(get("/cat/-2").accept("application/vnd.shop.app-v0.1+json")).andExpect(status().isOk())
				.andDo(MockMvcResultHandlers.print()).andExpect(jsonPath("$.data").exists());
	}
}
