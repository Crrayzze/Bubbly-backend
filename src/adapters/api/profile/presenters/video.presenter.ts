import { BasePresenter } from "domain/presenters/base.presenter";

export interface VideoPresenter extends BasePresenter {
	publishDate: string;
	url: string;
	updateData: string;
}
