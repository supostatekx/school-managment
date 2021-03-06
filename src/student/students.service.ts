import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentCreateInput } from './student-create.input';
import { StudentEntity } from './student.entity';
import { v4 as uuid } from 'uuid';
@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentsRepository: Repository<StudentEntity>,
  ) {}

  async getStudents(): Promise<StudentEntity[]> {
    return this.studentsRepository.find();
  }

  async getStudent(id: string): Promise<StudentEntity> {
    return this.studentsRepository.findOne({ id: id });
  }

  async createStudent(
    studentCreateInput: StudentCreateInput,
  ): Promise<StudentEntity> {
    return this.studentsRepository.save(
      this.studentsRepository.create({
        id: uuid(),
        firstName: studentCreateInput.firstName,
        lastName: studentCreateInput.lastName,
      }),
    );
  }

  async findAll(studentIds: string[]): Promise<StudentEntity[]> {
    return await this.studentsRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
