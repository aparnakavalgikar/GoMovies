package com.gomovies;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class MovieDao {

	private DatabaseConnection mysql  = new DatabaseConnection();
	private boolean status;

	ArrayList<Movie> movies = new ArrayList<Movie>();
	
    public ArrayList<Movie> getMovies() {
 
    	status = false;
    	    	
    	try {
    		
    		Connection con = mysql.createConnection();
	        PreparedStatement ps=null;

	        String select = "select * from movie";
			ps = con.prepareStatement(select);
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				Movie movie = new Movie();
				movie.setShowId(rs.getInt(1));
				movie.setTheaterName(rs.getString(2));
				movie.setMovieName(rs.getString(3));
				movie.setShowTime(rs.getString(4));
				movie.setPrice(rs.getDouble(5));
				movies.add(movie);
			}
			
		} catch(Exception e) {
			System.out.println(e);
		}
    	
   		return movies;
    }
}