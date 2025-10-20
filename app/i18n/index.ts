import { createInstance, i18n, TFunction, Namespace, KeyPrefix } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { locales, defaultLocale } from "@/config";

// 定义返回类型
interface UseTranslationResponse {
  t: TFunction;
  i18n: i18n;
}

// 定义 options 类型
interface UseTranslationOptions {
  keyPrefix?: KeyPrefix<"basic">;
}

const initI18next = async (
  lng: string = defaultLocale,
  ns: string | string[] = "basic"
): Promise<i18n> => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init({
      // debug: true,
      supportedLngs: locales,
      fallbackLng: defaultLocale,
      lng,
      fallbackNS: "basic",
      defaultNS: "basic",
      ns,
    });
  return i18nInstance;
};

export async function useTranslation(
  lng: string,
  ns: string | string[] = "basic",
  options: UseTranslationOptions = {}
): Promise<UseTranslationResponse> {
  const i18nextInstance = await initI18next(lng, ns);
  const namespace = (Array.isArray(ns) ? ns[0] : ns) as Namespace;
  return {
    t: i18nextInstance.getFixedT(lng, namespace, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
