import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ providerId, date }: Request): Promise<Appointment> {
    const newDate = startOfHour(date);
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const dateInUse = await await appointmentsRepository.findByDate(newDate);

    if (dateInUse) {
      throw new AppError('This time is not available');
    }

    const appointment = appointmentsRepository.create({
      provider_id: providerId,
      date: newDate,
    });
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
