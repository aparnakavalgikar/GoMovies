package com.gomovies;

import java.util.ArrayList;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("movies")
public class MovieRestService {
	
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<Movie> getMovies() {
        MovieDao movieDao = new MovieDao();
        return movieDao.getMovies();
    }
}