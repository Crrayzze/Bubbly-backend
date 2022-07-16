import { BasePresenter } from "domain/presenters/base.presenter";

export interface GenericResponsePresenter extends BasePresenter {
	message: string;
}
