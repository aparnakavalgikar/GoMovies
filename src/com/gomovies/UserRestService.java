package com.gomovies;

import java.util.ArrayList;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("users")
public class UserRestService {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<User> getDefaultUserInJSON() {
        UserDao userDao = new UserDao();
        return userDao.getDefaultUser();
    }
}