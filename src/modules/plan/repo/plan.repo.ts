/**
 * PlanRepository
 * 
 * Handles database operations related to company subscription plans.
 * 
 * Methods:
 * - createPlan(data: IRegisterPlan): Promise<IRegisterPlanDto>
 *   => Creates a new plan associated with a company.
 *   => Returns the created plan object.
 *   => Throws a database error on failure.
 * 
 * - getPlan(companyId: string): Promise<IRegisterPlanDto>
 *   => Retrieves the plan associated with the specified company.
 *   => Throws an error if no plan is found or if a database error occurs.
 */


import { MessageMap } from "../../../shared/messages";
import database from "../../../config/database";
import {
  IRegisterPlan,
  IRegisterPlanDto
} from "../interface/plan.interface";

export class PlanRepository {
  async create({
    companyId,
    licenseName,
  }: IRegisterPlan): Promise<IRegisterPlanDto> {
    try {
      const plan = await database.companyPlan.create({
        data: {
          companyId,
          licenseName,
        }
      });

      return { plan };
    } catch (err) {
      throw new Error(MessageMap.ERROR.MODULE.DATABASE);
    }
  };

  async get(companyId: string): Promise<IRegisterPlanDto> {
    try {
      const plan = await database.companyPlan.findUnique({
        where: { companyId },
      });

      if (!plan) {
        throw new Error(MessageMap.ERROR.MODULE.PLAN.REPO.NOT_PLAN);
      };

      return { plan }
    } catch (err) {
      throw new Error(MessageMap.ERROR.MODULE.DATABASE);
    }
  }
}