/**
 * CompanyRepository
 *
 * Repository class responsible for Company persistence operations.
 *
 * @method create(data: ICompanyCreate): Promise<ICompanyCreateDto>
 *   – Inserts a new company record into the database.
 *
 * @method get(params: ICompanyGet): Promise<ICompanyGetDtoOrNull>
 *   – Retrieves a company record by its document ID.
 *
 * @method update(data: ICompanyUpdate): Promise<ICompanyUpdateDto>
 *   – Updates an existing company’s details.
 *
 * @method suspend(params: ICompanySuspend): Promise<ICompanySuspendDto>
 *   – Suspends a company by setting its status to SUSPENDED.
 */

import { create } from "./company.create.repo";
import { suspend } from "./company.suspend.repo";
import { get } from "./company.get.repo";
import { update } from "./company.update.repo";

class CompanyRepository {
  create = create;
  get = get;
  update = update;
  suspend = suspend;
}

export const companyRepository = new CompanyRepository();