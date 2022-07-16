import { BasePresenter } from "domain/presenters/base.presenter";

export interface SearchPresenter extends BasePresenter {
    search: string;
}
