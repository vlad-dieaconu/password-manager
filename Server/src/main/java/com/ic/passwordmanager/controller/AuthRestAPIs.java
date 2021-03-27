package com.ic.passwordmanager.controller;

import javax.validation.Valid;

import com.ic.passwordmanager.model.User;
import com.ic.passwordmanager.repositories.UserRepository;
import com.ic.passwordmanager.request.JwtResponse;
import com.ic.passwordmanager.request.LoginForm;
import com.ic.passwordmanager.request.SignUpForm;
import com.ic.passwordmanager.security.jwt.JwtUtils;
import com.ic.passwordmanager.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthRestAPIs {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;



    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtProvider;

    @PostMapping("/signin")
    public ResponseEntity authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

        System.out.println(loginRequest.getEmail());
        System.out.println(loginRequest.getPassword());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();


        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);

        return ResponseEntity.ok(new JwtResponse(jwt,userDetails.getEmail(),userDetails.getId(),userDetails.getAccounts()));
    }


    @PostMapping("/signup")
    public ResponseEntity registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity("Fail -> Email is already taken!",
                    HttpStatus.BAD_REQUEST);
        }



        // Creating user's account
        User user = new User(signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getAccounts());




        userRepository.save(user);

        return ResponseEntity.ok().body("User registered successfully!");
    }
}
