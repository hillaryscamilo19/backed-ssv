import { Controller, Get, Param, Query } from "@nestjs/common"
import  { DoctorsService } from "./doctors.service"
import  { Doctor } from "./entities/doctor.entity"

@Controller("")
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
    const date = new Date(dateString)
    const available = await this.doctorsService.checkAvailability(id, date)

    if (!available) {
      const nextAvailability = await this.doctorsService.getNextAvailability(id)
      return { available, nextAvailability }
    }

    return { available }
  }
}

