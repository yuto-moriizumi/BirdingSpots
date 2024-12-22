"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tag, TagInput } from "emblor";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useStoredTags } from "../_util/useStorage";

const FormSchema = z.object({
  topics: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
});

export default function Filter(props: { options: Tag[] }) {
  const { tags, setTags } = useStoredTags();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const { setValue } = form;

  const t = useTranslations("Home");

  return (
    <Form {...form}>
      <form className="space-y-8 flex flex-col items-start">
        <FormField
          control={form.control}
          name="topics"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormControl className="w-full">
                {/** @ts-expect-error TagInputの型定義がおかしいので無視 */}
                <TagInput
                  {...field}
                  placeholder={t("filter")}
                  tags={tags}
                  setTags={(newTags) => {
                    setTags(newTags as Tag[]);
                    setValue("topics", newTags as [Tag, ...Tag[]]);
                  }}
                  activeTagIndex={activeTagIndex}
                  setActiveTagIndex={setActiveTagIndex}
                  enableAutocomplete
                  autocompleteOptions={props.options}
                  restrictTagsToAutocompleteOptions
                  styleClasses={{
                    inlineTagsContainer: "flex flex-wrap gap-1 p-1",
                    tag: {
                      body: "bg-gray-200 pl-2 rounded-full",
                      closeButton: "text-gray-500 px-0 pr-1",
                    },
                    input: "bg-gray-200 pl-3",
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
