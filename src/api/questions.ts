import { createEffect, EffectError } from "effector";
import { DataFromFn, settingsT } from "../components/Menu/store/model";

export interface CardStoreT {
  question: string;
  answers: string[];
  id: number;
}

export interface responseI {
  ok: boolean;
  data: CardStoreT[] | string;
  amount?: number;
}

const BASE_URL = "https://engine.lifeis.porn/api/millionaire.php";

async function request<TResponse>(
  url: string,
  config?: RequestInit
): Promise<TResponse> {
  try {
    const response = await fetch(url, config);
    return await response.json();
  } catch (err) {
    throw Error(err as any);
  }
}

export const getQuestionFx = createEffect<settingsT, CardStoreT[], any>(
  async (params) => {
    const count = params.count || 1;
    const response = await request<responseI>(
      `${BASE_URL}?qType=${params.difficult}&count=${count}`
    );
    if (response.ok) {
      console.log(`response `, response);
      return response.data as CardStoreT[];
    }
    throw Error(response.data as string);
  }
);

getQuestionFx.doneData.watch((her) => console);

export const getQuestionEvent = getQuestionFx.prepend((params: DataFromFn) => {
  return {
    difficult: params.difficult,
    count: params?.count,
  };
});

getQuestionFx.fail.watch((err) => console.error(`err`, err));