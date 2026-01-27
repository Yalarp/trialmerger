package com.etour.app.email.service.impl;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.etour.app.email.service.EmailService;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Attachments;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

@Service
public class SendGridEmailServiceImpl implements EmailService {

    @Value("${sendgrid.api.key}")
    private String sendGridApiKey;

    @Value("${sendgrid.from.email}")
    private String fromEmail;

    @Value("${sendgrid.from.name}")
    private String fromName;

    /**
     * Sends invoice email asynchronously.
     * 
     * IMPORTANT:
     * - This method must NEVER throw exception
     * - Email failure must NOT affect payment or booking
     */
    @Async
    @Override
    public void sendInvoiceEmail(
            String to,
            String subject,
            String body,
            byte[] pdfBytes,
            String fileName
    ) {

        try {
            Email from = new Email(fromEmail, fromName);
            Email toEmail = new Email(to);

            Content content = new Content("text/plain", body);
            Mail mail = new Mail(from, subject, toEmail, content);

            // ---------- PDF ATTACHMENT ----------
            Attachments attachment = new Attachments();
            attachment.setFilename(fileName);
            attachment.setType("application/pdf");
            attachment.setDisposition("attachment");
            attachment.setContent(
                    Base64.getEncoder().encodeToString(pdfBytes)
            );

            mail.addAttachments(attachment);

            SendGrid sg = new SendGrid(sendGridApiKey);
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sg.api(request);

            // Log failure but DO NOT throw
            if (response.getStatusCode() >= 400) {
                System.err.println(
                        "SendGrid email failed. Status: " +
                        response.getStatusCode() +
                        ", Body: " + response.getBody()
                );
            }

        } catch (Exception e) {
            // CRITICAL RULE:
            // Never throw exception from async email
            System.err.println("Exception while sending invoice email to: " + to);
            e.printStackTrace();
        }
    }
}
