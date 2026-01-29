package com.etour.app.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etour.app.dto.BookingRequestDTO;
import com.etour.app.dto.BookingResponseDTO;
import com.etour.app.dto.PassengerDTO;
import com.etour.app.entity.*;
import com.etour.app.repository.*;
import com.etour.app.service.BookingService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingHeaderRepository bookingRepo;

    @Autowired
    private PassengerRepository passengerRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private TourRepository tourRepo;

    @Autowired
    private DepartureDateRepository departureRepo;

    @Autowired
    private CostRepository costRepo;

    // =================================================
    // 1️⃣ CREATE BOOKING
    // =================================================

    @Override
    public BookingHeader createBooking(BookingRequestDTO dto) {

        System.out.println("DEBUG: Processing Booking Request");
        System.out.println("DEBUG: Customer ID: " + dto.getCustomerId());
        System.out.println("DEBUG: Tour ID: " + dto.getTourId());
        System.out.println("DEBUG: DepartureDate ID: " + dto.getDepartureDateId());
        if (dto.getPassengers() != null) {
            System.out.println("DEBUG: Passenger Count: " + dto.getPassengers().size());
            dto.getPassengers().forEach(p -> System.out
                    .println("DEBUG: Passenger: " + p.getPassengerName() + " DOB: " + p.getDateOfBirth()));
        } else {
            System.out.println("DEBUG: Passengers list is NULL");
        }

        // ---------------- FETCH MASTER DATA ----------------

        if (dto.getCustomerId() == null) {
            throw new RuntimeException("Customer ID is missing in request");
        }
        CustomerMaster customer = customerRepo.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + dto.getCustomerId()));

        TourMaster tour = null;
        if (dto.getTourId() != null) {
            tour = tourRepo.findById(dto.getTourId()).orElse(null);
        }

        if (tour == null && dto.getDepartureDateId() != null) {
            // Fallback: If tourId is null, try to find the tour linked to this departure
            // date
            System.out.println("DEBUG: tourId is null, attempting fallback lookup via departureDateId: "
                    + dto.getDepartureDateId());
            tour = tourRepo.findAll().stream()
                    .filter(t -> t.getDepartureDate() != null
                            && t.getDepartureDate().getId().equals(dto.getDepartureDateId()))
                    .findFirst()
                    .orElse(null);
        }

        if (tour == null) {
            throw new RuntimeException("Tour not found (Neither via tourId nor departureDateId)");
        }

        DepartureDateMaster departure = departureRepo.findById(dto.getDepartureDateId())
                .orElseThrow(
                        () -> new RuntimeException("Departure Date not found with ID: " + dto.getDepartureDateId()));

        // ---------------- FETCH COST ----------------
        List<CostMaster> costs = costRepo.findByCatmaster_Id(tour.getCatmaster().getId());

        if (costs.isEmpty()) {
            throw new RuntimeException("Cost not configured for Category ID: " + tour.getCatmaster().getId());
        }

        // Assuming there's one active cost or picking the first one
        // Ideally we should filter by valid dates as well
        CostMaster cost = costs.get(0);

        int totalPassengers = dto.getPassengers().size();

        // ---------------- ROOM PRICE CALCULATION ----------------

        BigDecimal tourAmount = calculateDynamicTourCost(
                dto.getPassengers(),
                departure.getDepartureDate(),
                cost);

        BigDecimal taxAmount = tourAmount.multiply(new BigDecimal("0.05"));

        BigDecimal totalAmount = tourAmount.add(taxAmount);

        // ---------------- SAVE BOOKING HEADER ----------------

        BookingHeader booking = new BookingHeader();

        booking.setBookingDate(LocalDate.now());
        booking.setCustomer(customer);
        booking.setTour(tour);
        booking.setDepartureDate(departure);

        booking.setTotalPassengers(totalPassengers);
        booking.setTourAmount(tourAmount);
        booking.setTaxAmount(taxAmount);
        booking.setTotalAmount(totalAmount);
        booking.setBookingStatus("PENDING");

        BookingHeader savedBooking = bookingRepo.save(booking);

        // ---------------- SAVE PASSENGERS ----------------

        if (totalPassengers <= 0) {
            throw new RuntimeException("Total passengers must be greater than zero");
        }

        // FIXED BigDecimal Division (NO ERROR NOW)
        BigDecimal perPassengerAmount = BigDecimal.ZERO;
        if (totalPassengers > 0) {
            perPassengerAmount = tourAmount.divide(
                    new BigDecimal(totalPassengers),
                    2,
                    RoundingMode.HALF_UP);
        }

        for (PassengerDTO p : dto.getPassengers()) {

            PassengerMaster passenger = new PassengerMaster();

            passenger.setBooking(savedBooking);
            passenger.setPassengerName(p.getPassengerName());
            passenger.setDateOfBirth(p.getDateOfBirth());
            // passenger.setPassengerName("TEST");
            // passenger.setDateOfBirth(java.time.LocalDate.now());

            passenger.setPassengerType("ADULT");
            passenger.setPassengerAmount(perPassengerAmount);

            passengerRepo.save(passenger);
        }

        return savedBooking;
    }

    // =================================================
    // ROOM ALLOCATION LOGIC
    // =================================================

    // =================================================
    // DYNAMIC COST CALCULATION (Age-Based + Rooming)
    // =================================================

    private BigDecimal calculateDynamicTourCost(
            List<PassengerDTO> passengers,
            LocalDate departureDate,
            CostMaster cost) {

        BigDecimal totalCost = BigDecimal.ZERO;

        // RULE: If only 1 passenger, ALWAYS apply Adult Single Person Cost
        // (Even if child or infant, they occupy the room alone)
        if (passengers.size() == 1) {
            System.out.println("DEBUG: Single Passenger detected - Applying Single Person Cost regardless of age.");
            return cost.getSinglePersonCost();
        }

        int adults = 0;
        int children = 0;
        int infants = 0;

        // 1. Classify Passengers
        for (PassengerDTO p : passengers) {
            int age = calculateAge(p.getDateOfBirth(), departureDate);
            if (age >= 12) {
                adults++;
            } else if (age >= 2) {
                children++;
                // Add Child Cost immediately (assuming without bed for simplicity or standard
                // logic)
                // TODO: If "With Bed" is needed, passed in DTO
                totalCost = totalCost.add(cost.getChildWithoutBedCost());
            } else {
                infants++;
                // Infants are free
            }
        }

        // VALIDATION: Enforce at least one adult
        if (adults == 0) {
            throw new RuntimeException("Booking failed: At least one Adult (12+ years) is required.");
        }

        System.out.println("DEBUG: Cost Calc - Adults: " + adults + ", Children: " + children);

        // 2. Room Allocation & Adult Cost Calculation

        if (adults > 0) {
            int doubleRooms = adults / 2;
            int remainingAdults = adults % 2;

            // Cost for Double Rooms (2 people per room)
            // stored as 'baseCost' usually means per person on twin sharing?
            // OR per room?
            // User prompt said: "Starting From price... represents base cost for twin
            // sharing".
            // Usually this means "Per Person on Twin Sharing".
            // So for a double room, cost is 2 * baseCost.

            BigDecimal doubleRoomCost = cost.getBaseCost().multiply(new BigDecimal(2));
            totalCost = totalCost.add(doubleRoomCost.multiply(new BigDecimal(doubleRooms)));

            // Remaining Adult (Single Room or Extra Bed?)
            if (remainingAdults == 1) {
                // Single Room
                totalCost = totalCost.add(cost.getSinglePersonCost());
            }
        }

        return totalCost;
    }

    private int calculateAge(LocalDate dob, LocalDate departureDate) {
        if (dob == null || departureDate == null)
            return 0;
        return java.time.Period.between(dob, departureDate).getYears();
    }

    // =================================================
    // 2️⃣ GET BOOKINGS BY CUSTOMER
    // =================================================

    @Override
    public List<BookingResponseDTO> getBookingsByCustomer(Integer customerId) {
        return bookingRepo.getBookingsByCustomerId(customerId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // =================================================
    // 3️⃣ GET BOOKING BY ID
    // =================================================

    @Override
    public BookingResponseDTO getBookingById(Integer bookingId) {
        BookingHeader booking = bookingRepo.findByIdWithDetails(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));
        return toDTO(booking);
    }

    // =================================================
    // 4️⃣ GET ALL BOOKINGS (ADMIN)
    // =================================================

    @Override
    public List<BookingResponseDTO> getAllBookings() {
        return bookingRepo.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // =================================================
    // 5️⃣ CANCEL BOOKING
    // =================================================

    @Override
    public void cancelBooking(Integer bookingId) {
        // 1. Delete associated passengers first
        List<PassengerMaster> passengers = passengerRepo.findPassengersByBookingId(bookingId);
        if (passengers != null && !passengers.isEmpty()) {
            passengerRepo.deleteAll(passengers);
        }

        // 2. Delete the booking header
        bookingRepo.deleteById(bookingId);
    }

    private BookingResponseDTO toDTO(BookingHeader booking) {
        BookingResponseDTO dto = new BookingResponseDTO();

        // Basic booking info
        dto.setId(booking.getId());
        dto.setBookingDate(booking.getBookingDate());
        dto.setBookingStatus(booking.getBookingStatus());
        dto.setTotalPassengers(booking.getTotalPassengers());
        dto.setTourAmount(booking.getTourAmount());
        dto.setTaxAmount(booking.getTaxAmount());
        dto.setTotalAmount(booking.getTotalAmount());

        // Customer info
        if (booking.getCustomer() != null) {
            dto.setCustomerId(booking.getCustomer().getId());
            dto.setCustomerName(booking.getCustomer().getName());
            dto.setCustomerEmail(booking.getCustomer().getEmail());
            dto.setCustomerMobile(booking.getCustomer().getMobileNumber());
        }

        // Tour info
        if (booking.getTour() != null) {
            dto.setTourId(booking.getTour().getId());
            dto.setTourDescription(booking.getTour().getDescription());
            if (booking.getTour().getCatmaster() != null) {
                dto.setTourCategoryName(booking.getTour().getCatmaster().getName());
            }
        }

        // Departure date info
        if (booking.getDepartureDate() != null) {
            dto.setDepartureDateId(booking.getDepartureDate().getId());
            dto.setDepartureDate(booking.getDepartureDate().getDepartureDate());
            dto.setEndDate(booking.getDepartureDate().getEndDate());
            dto.setNumberOfDays(booking.getDepartureDate().getNumberOfDays());
        }

        return dto;
    }
}
