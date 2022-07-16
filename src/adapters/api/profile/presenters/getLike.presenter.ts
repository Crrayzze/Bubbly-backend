import { BasePresenter } from "domain/presenters/base.presenter";

export interface GetLikePresenter extends BasePresenter {
	user_id: string;
	udapte_date: string;
}
