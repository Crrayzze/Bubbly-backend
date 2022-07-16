import { BasePresenter } from "domain/presenters/base.presenter";

export interface PreferencePresenter extends BasePresenter {
	age_minimum: number;
	age_maximum: number;
}
