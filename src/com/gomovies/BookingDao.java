package com.gomovies;

import java.sql.*;

public class BookingDao {
	
	private DatabaseConnection mysql  = new DatabaseConnection();
	private boolean status;
	
    public boolean createBooking(Booking booking) {
    	
    	status = false;
    	int showId = 0;
    	String movieName = booking.getMovieName();
    	String theaterName = booking.getTheaterName();
    	String showTime = booking.getShowTime();
    	double price = booking.getPrice();

    	try {
    		
    		Connection con = mysql.createConnection();
	        PreparedStatement ps=null;

	        String insert = "insert into movie (movieName, theaterName, showTime, price) values(?,?,?,?)";
			ps = con.prepareStatement(insert);
			ps.setString(1, movieName);
			ps.setString(2, theaterName);
			ps.setString(3, showTime);
			ps.setDouble(4, price);
			
			int rs = ps.executeUpdate();

			if ( rs >= 0 )
				status = true;
			
		} catch(Exception e) {
			System.out.println(e);
		}
    	
    	try {
    		
    		Connection con = mysql.createConnection();
	        PreparedStatement ps=null;

	        String select = "select id from movie where movieName=? and theaterName=? and showTime=? and price=?";
			ps = con.prepareStatement(select);
			ps.setString(1, movieName);
			ps.setString(2, theaterName);
			ps.setString(3, showTime);
			ps.setDouble(4, price);
			
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()){
				showId = rs.getInt(1);
			}
			
		} catch(Exception e) {
			System.out.println(e);
		}

    	try {
    		
    		Connection con = mysql.createConnection();
	        PreparedStatement ps=null;

	        String insert = "insert into booking (showId, movieName, theaterName, showTime, price) values(?,?,?,?,?)";
			ps = con.prepareStatement(insert);
			ps.setInt(1, showId);
			ps.setString(2, movieName);
			ps.setString(3, theaterName);
			ps.setString(4, showTime);
			ps.setDouble(5, price);
			
			int rs = ps.executeUpdate();

			if ( rs >= 0 )
				status = true;
			
		} catch(Exception e) {
			System.out.println(e);
		}
    	
    	return status;
	}
    
    public void updateBooking() {}
    public void getBooking() {}    
    public void deleteBooking() {}
}