"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setUserLocale } from "@/i18n/locale";
import clsx from "clsx";
import { useTransition } from "react";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
};

export default function LocaleSwitcherSelect({ defaultValue, items }: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value;
    startTransition(() => {
      setUserLocale(locale as "ja" | "en");
    });
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
      <SelectTrigger
        className={clsx(
          "w-[6rem]",
          isPending && "pointer-events-none opacity-60"
        )}
      >
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
