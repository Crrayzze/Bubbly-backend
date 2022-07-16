import { BasePresenter } from "domain/presenters/base.presenter";

export interface LikePresenter extends BasePresenter {
	match: boolean;
}
