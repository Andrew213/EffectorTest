import { createEffect } from "effector";

import { CardStoreT } from "../components/Card/store/model";
import { gameSettingsT } from "../stores/main";

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

//&apikey=${process.env.REACT_APP_API_KEY}
export const getQuestionFx = createEffect<gameSettingsT, CardStoreT[], any>(
  async (params) => {
    const count = params.count || 1;
    const response = await request<responseI>(
      `${BASE_URL}?qType=${
        params.settings.difficult
      }&count=${count}&t=${Date.now()}`
    );
    if (response.ok) {
      return response.data as CardStoreT[];
    }
    throw Error(response.data as string);
  }
);

getQuestionFx.fail.watch((err) => console.error(`err`, err));
