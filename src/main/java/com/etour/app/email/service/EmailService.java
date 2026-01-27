package com.etour.app.email.service;

public interface EmailService {

    void sendInvoiceEmail(
            String to,
            String subject,
            String body,
            byte[] pdfBytes,
            String fileName
    );
}
