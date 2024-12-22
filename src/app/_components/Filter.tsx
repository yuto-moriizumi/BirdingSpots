"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tag, TagInput } from "emblor";
import { useState } from "react";

const FormSchema = z.object({
  topics: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
});

export default function Filter(props: {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  options: Tag[];
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const { setValue } = form;

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
                  placeholder="非表示にする鳥を選択"
                  tags={props.tags}
                  setTags={(newTags) => {
                    props.setTags(newTags as Tag[]);
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
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
