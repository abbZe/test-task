import { Injectable } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
    private readonly _transporter: Transporter;

    constructor() {
        this._transporter = nodemailer.createTransport({
            service: 'gmail',
            port: Number(process.env.SMTP_PORT),
            host: process.env.SMTP_HOST,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    public async sendMail(to: string, subject: string, text: string) {
        await this._transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            text,
        });
    }
}
