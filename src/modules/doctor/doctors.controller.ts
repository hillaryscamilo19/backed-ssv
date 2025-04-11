import { BadRequestException, Controller, Get, Param, Query } from "@nestjs/common"
import  { DoctorsService } from "./doctors.service"
import  { Doctor } from "./entities/doctor.entity"

@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  findAll(): Promise<Doctor[]> {
    return this.doctorsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Doctor> {
    return this.doctorsService.findOne(id);
  }
  @Get(":id/availability")
  async checkAvailability(
    @Param('id') id: string,
    @Query('date') dateString: string,
  ): Promise<{ available: boolean; nextAvailability?: any }> {
    // Validar y parsear la fecha de manera más robusta
    const date = dateString ? new Date(dateString) : new Date();
    
    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Fecha inválida');
    }
    
    const available = await this.doctorsService.checkAvailability(id, date);
  
    if (!available) {
      const nextAvailability = await this.doctorsService.getNextAvailability(id);
      return { available, nextAvailability };
    }
  
    return { available };
  }
}

