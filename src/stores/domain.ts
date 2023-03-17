import { createDomain, createEvent } from "effector";

const httpDomain = createDomain("http");

type StoreT = {
  status: number;
};

const statusCodeChanged = httpDomain.createEvent();
const downloadFx = httpDomain.createEvent();
const apiDomain = httpDomain.createDomain(); //nested

const resetDomainStore = createEvent();

httpDomain.onCreateStore((store) => store.reset(resetDomainStore));

export const $data = httpDomain.createStore<StoreT>({ status: -1 });
