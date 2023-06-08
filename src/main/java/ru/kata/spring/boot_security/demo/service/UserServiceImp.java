package ru.kata.spring.boot_security.demo.service;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;


import java.util.Collections;
import java.util.List;

@Service("userDetailsService")
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;

    public UserServiceImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    @Modifying
    @Override
    public void add(User user) {
        if (user.getRoleName() != null && user.getRoleName().equals("ROLE_ADMIN")) {
            user.setRoles(Collections.singleton(new Role(1L, "ROLE_ADMIN")));
        } else {
            user.setRoles(Collections.singleton(new Role(2L, "ROLE_USER")));
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    @Override
    public List<User> listUsers() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    @Override
    public User showUser(long id) {
        return userRepository.findById(id).get();
    }

    @Transactional
    @Modifying
    @Override
    public void update(User user) {
        if (user.getRoleName() != null && user.getRoleName().equals("ROLE_ADMIN")) {
            user.setRoles(Collections.singleton(new Role(1L, "ROLE_ADMIN")));
        } else {
            user.setRoles(Collections.singleton(new Role(2L, "ROLE_USER")));
        }
        userRepository.save(user);
    }

    @Transactional
    @Modifying
    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Override
    @Transactional(readOnly = true)
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user != null) return user;
        throw new UsernameNotFoundException("User ‘" + username + "’ not found");
    }
}
