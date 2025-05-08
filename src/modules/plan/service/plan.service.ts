/**
 * ServicePlan
 * 
 * Contains business logic for managing company subscription plans.
 * 
 * Methods:
 * - register(data: IRegisterPlan): Promise<IRegisterPlanDto>
 *   => Checks if a plan already exists for the given company.
 *   => If not, creates a new plan via PlanRepository.
 *   => Throws an error if a plan already exists.
 * 
 * - get(planId: string): Promise<IRegisterPlanDto>
 *   => Retrieves the company plan by ID using PlanRepository.
 */


import {
  PlanRepository
} from "../repo/plan.repo";
import {
  IRegisterPlan,
  IRegisterPlanDto
} from "../interface/plan.interface";
import { MessageMap } from "../../../shared/messages";

export class PlanService {
  private planRepository = new PlanRepository();

  async create({
    companyId,
    licenseName
  }: IRegisterPlan): Promise<IRegisterPlanDto> {
    const existPlan = await this.get(companyId);

    if (existPlan) {
      throw new Error(MessageMap.ERROR.MODULE.PLAN.SERVICE.HAS);
    }

    return await this.planRepository.create({
      companyId,
      licenseName
    });
  }

  async get(
    planId: string
  ) {
    return await this.planRepository.get(planId);
  }
}