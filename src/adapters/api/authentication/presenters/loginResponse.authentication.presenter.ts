import { BasePresenter } from "domain/presenters/base.presenter";

export interface LoginResponsePresenter extends BasePresenter {
	message: string;
	token?: string;
}
