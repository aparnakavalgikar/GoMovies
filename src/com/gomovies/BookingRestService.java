package com.gomovies;

import javax.ws.rs.POST;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;

import java.util.ArrayList;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


@Path("bookings")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class BookingRestService {

	
	@POST
    public boolean createBooking(Booking booking) {
		BookingDao bookingDao = new BookingDao();
		return bookingDao.createBooking(booking);
    }
	
	@GET
	@Path("id")
    public Booking getBooking(@PathParam("id") int id) {
		return null;
    }
}