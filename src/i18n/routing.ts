import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["ja", "en"],
  defaultLocale: "ja",
  /**
   * ロケールプレフィックス戦略
   * @see https://next-intl.dev/docs/routing#locale-prefix-never
   * `always` または `as-needed` を指定する場合と、`never` を指定する場合とでレンダリングのタイミングが異なる。
   * `generateStaticParams`を利用しているという前提の上で、
   * 前者の場合はビルド時及びrevalidate時のみレンダリングされる。
   * 後者の場合は、LanguageSwitcherの実装をServerActionでのクッキー設定に置き換えるため、
   * さらに言語切替時にもレンダリングされる。(置き換えないとLSが反映されない)
   * `never`でもSSGになり、i18n routingを利用したdynamicRenderingよりは確実にパフォーマンス上の利点がある。
   * 例えば複数クライアントから異なる言語のリクエストがあっても既存のキャッシュが使い回される。
   * そのため常にi18n routingを使用し、パスにロケールプレフィックスを含めるかはここの設定で決めると良い。
   */
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
