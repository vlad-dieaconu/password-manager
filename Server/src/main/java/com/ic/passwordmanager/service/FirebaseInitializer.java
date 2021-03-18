package com.ic.passwordmanager.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;

@Service
public class FirebaseInitializer {

    private void initDB() throws IOException {

        FileInputStream serviceAccount =
                new FileInputStream("./password-manager-ae863-firebase-adminsdk-3u0j2-cbe90292b5n");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        FirebaseApp.initializeApp(options);

    }


}
