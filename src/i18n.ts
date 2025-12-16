import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale is provided by next-intl and should be awaited if it's a Promise
  const locale = requestLocale instanceof Promise 
    ? await requestLocale 
    : requestLocale ?? "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
