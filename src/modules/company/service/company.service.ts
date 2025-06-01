/**
 * @module service.company
 * @description Service class responsible for orchestration of company business logic.
 *
 * @method create(params: ICompanyCreate): Promise<ICompanyCreateDto>
 *   – Delegates to company.create.service to register a new company.
 *
 * @method get(params: ICompanyGet): Promise<ICompanyGetDto>
 *   – Delegates to company.get.service to retrieve company details.
 *
 * @method update(params: ICompanyUpdate): Promise<ICompanyUpdateDto | Error>
 *   – Delegates to company.update.service to update company details.
 *
 * @method suspend(params: ICompanySuspend): Promise<ICompanySuspendDto | Error>
 *   – Delegates to company.suspend.service to suspend the company.
 */

import { create } from "./company.create.service";
import { get } from "./company.get.service";
import { suspend } from "./company.suspend.service";
import { update } from "./company.update.service";

class CompanyService {
  create = create;
  get = get;
  update = update;
  suspend = suspend;
}

export const companyService = new CompanyService();