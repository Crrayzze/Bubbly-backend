import { BasePresenter } from "domain/presenters/base.presenter";

export interface UserPresenter extends BasePresenter {
	email: string;
	password: string;
	confirmed: boolean;
	code: string;
}
