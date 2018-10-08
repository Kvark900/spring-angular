package com.kvark900.backend.controller;

import com.kvark900.backend.services.RoleService;
import com.kvark900.backend.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class AccountController {

	private static final Logger logger = LoggerFactory.getLogger(AccountController.class);
	private final UserService userService;
	private final RoleService roleService;

	@Autowired
	public AccountController(UserService userService, RoleService roleService) {
		this.userService = userService;
		this.roleService = roleService;
	}


	@GetMapping("/login")
	public Principal user(Principal principal) {
		logger.info("user logged " + principal);
		return principal;
	}

}
