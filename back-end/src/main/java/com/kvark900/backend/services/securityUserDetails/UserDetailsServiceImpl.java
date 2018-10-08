package com.kvark900.backend.services.securityUserDetails;

import com.kvark900.backend.entities.User;
import com.kvark900.backend.services.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private UserService userService;

    public UserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override//Get user by email or username
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userByEmail, userByUsername;
        if ((userByEmail = userService.findByEmailEagerly(username)) != null)
            return new UserDetailsImpl(userByEmail);
        else if ((userByUsername = userService.findByUsername(username)) != null)
            return new UserDetailsImpl(userByUsername);
        throw new UsernameNotFoundException(username);
    }
}