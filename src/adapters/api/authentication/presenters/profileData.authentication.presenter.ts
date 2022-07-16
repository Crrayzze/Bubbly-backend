import { BasePresenter } from "domain/presenters/base.presenter";

export interface ProfilDataPresenter extends BasePresenter {
	firstName: string;
	lastName: string;
	phoneNbr: string;
	birthday: Date;
	description: string;
}
