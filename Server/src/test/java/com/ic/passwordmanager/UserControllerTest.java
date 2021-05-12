package com.ic.passwordmanager;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void findAccountByIdTest() throws Exception {

        String token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MkBtYWlsLmNvbSIsImlkIjoiNjA3NTUxZTFiYjJmMGUwMzZhNTc3YjhhIiwiZXhwIjoxNjIwOTMzMzExLCJpYXQiOjE2MjA4NDY5MTF9.FfUP2ffZXwDuzVIU2nt6jvyhfSxtW0ApkHN5FzNPlP02do-cx-_gI-q6n7R4y_OYetHvIDJAqwab_DfsddqF-Q";
        String id = "607551e1bb2f0e036a577b8a";

        mockMvc.perform(get("/users/accounts/607551e1bb2f0e036a577b8a")
                .param("id", id)
                .header("Authorization", token)
        ).andExpect(status().isOk())
                .andExpect( content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(10)))
                .andExpect( jsonPath("$[0].platforma", is("Facebook")));

    }
}
