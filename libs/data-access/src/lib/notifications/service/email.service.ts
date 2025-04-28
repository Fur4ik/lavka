import { Injectable } from "@angular/core"
import emailjs from 'emailjs-com';
import { EmailDto } from "../"

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  #serviceID = 'service_b7ql1nf'
  #publicKey = 'Ya70TVLT1RYO-2DrM'
  #templateID = 'template_9m05f0c'

  constructor() {
    emailjs.init(this.#publicKey); // Инициализация
  }

  sendEmail(template_params: EmailDto) {
    return emailjs.send(this.#serviceID, this.#templateID, template_params)
  }
}