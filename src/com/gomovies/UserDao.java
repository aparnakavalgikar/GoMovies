package com.gomovies;

import java.util.ArrayList;

public class UserDao {

	ArrayList<User> users = new ArrayList<User>();
	
    public ArrayList<User> getDefaultUser() {
        
    	User user1 = new User();
        user1.setFirstName("Jon");
        user1.setLastName("Doe");
        users.add(user1);
        
        return users;
    }
}