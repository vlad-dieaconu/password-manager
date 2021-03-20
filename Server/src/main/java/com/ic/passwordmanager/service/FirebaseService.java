package com.ic.passwordmanager.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.ic.passwordmanager.model.User;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class FirebaseService {

    public String saveUserDetails(User user) throws Exception {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        User u;
        u = UserService.encrpytPassword(user);

        u.setAccounts(user.getAccounts().stream()
        .map(account -> AccountService.encrpytPassword(account))
        .collect(Collectors.toList()));

        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("users").document(user.getEmail()).set(u);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public User getUserDetails(String email) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("users").document(email);
        // asynchronously retrieve the document
        ApiFuture<DocumentSnapshot> future = docRef.get();
        // block on response
        DocumentSnapshot document = future.get();
        User user = null;
        if (document.exists()) {
            // convert document to POJO
            user = document.toObject(User.class);
            System.out.println(user);
            user.setAccounts(user.getAccounts().stream()
                    .map(account -> AccountService.decryptPassword(account))
                    .collect(Collectors.toList()));
            return user;
        } else {
            System.out.println("No such document!");
            return null;
        }
    }

    public String deleteUser(String name) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = db.collection("users").document(name).delete();
        return writeResult.get().getUpdateTime().toString();
    }


}
