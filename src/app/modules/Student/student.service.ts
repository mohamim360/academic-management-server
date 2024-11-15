import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { studentSearchableFields } from './student.constant';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate('academicDepartment academicFaculty'),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleStudentFromDB = async (id: string) => {
  
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate('academicDepartment academicFaculty');
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  try {
      const { name, guardian, localGuardian, student, ...remainingStudentData } = payload; // Extract student from payload
      const modifiedUpdatedData: Record<string, unknown> = {};

      // Handle the incoming nested student data
      if (student && Object.keys(student).length) {
          for (const [key, value] of Object.entries(student)) {
              modifiedUpdatedData[key] = value;
          }
      }

      // Collect other fields from the incoming payload
      if (remainingStudentData && Object.keys(remainingStudentData).length) {
          for (const [key, value] of Object.entries(remainingStudentData)) {
              modifiedUpdatedData[key] = value;
          }
      }

      // Handle name, guardian, and localGuardian fields
      if (name && Object.keys(name).length) {
          for (const [key, value] of Object.entries(name)) {
              modifiedUpdatedData[`name.${key}`] = value;
          }
      }

      if (guardian && Object.keys(guardian).length) {
          for (const [key, value] of Object.entries(guardian)) {
              modifiedUpdatedData[`guardian.${key}`] = value;
          }
      }

      if (localGuardian && Object.keys(localGuardian).length) {
          for (const [key, value] of Object.entries(localGuardian)) {
              modifiedUpdatedData[`localGuardian.${key}`] = value;
          }
      }

      // Log modified data before the update
      console.log('Modified data for update:', modifiedUpdatedData);

      const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
          new: true,
          runValidators: true,
      });

      if (!result) {
          console.log('No document found for the given ID:', id);
          throw new Error('Student not found');
      }

      console.log('Update result:', result);
      return result;

  } catch (error) {
      console.error('Error updating student:', error);
      throw error;  // Handle the error as needed
  }
};



const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // get user _id from deletedStudent
    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
