import { getCustomRepository } from "typeorm";
import { startOfHour } from "date-fns";

import AppError from "../errors/AppError";

import AppointmentRepository from "../repositories/AppointmentRepository";
import Appointment from "../models/Appointment";

interface Request {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, providerId }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked");
    }

    const appointment = appointmentRepository.create({
      provider_id: providerId,
      date: appointmentDate,
    });

    return appointmentRepository.save(appointment);
  }
}

export default CreateAppointmentService;
