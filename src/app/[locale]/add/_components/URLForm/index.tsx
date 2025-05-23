"use client";

import { getSpotData } from "./getSpotData";
import { Spot } from "@/model/Spot";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

const schema = z.object({
  url: z.string().url(),
  dataURL: z.string().url(),
});
type Schema = z.infer<typeof schema>;

/** AIを使ってフォーム入力を補助するコンポーネント */
export function URLForm(props: { onData: (data: Spot) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const t = useTranslations("AddSpotPage");

  const onSubmit = async (data: { url: string; dataURL: string }) => {
    try {
      const idMatch = data.url.match(/\/(\d+)\/?$/);
      const id = idMatch ? idMatch[1] : "1";
      const spotData = await getSpotData(id, data.dataURL);
      props.onData({ id, ...spotData });
      reset();
    } catch (error) {
      console.error("Validation or fetching error:", error);
    }
  };

  const handlePaste = async (event: React.ClipboardEvent<HTMLInputElement>) => {
    const items = event.clipboardData.items;
    for (const item of items) {
      if (!item.type.startsWith("image/")) continue;
      const file = item.getAsFile();
      if (!file) continue;
      const reader = new FileReader();
      reader.onload = (e) => {
        setValue("dataURL", e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="flex items-center space-x-4">
        <label className="text-gray-700 w-1/4">URL:</label>
        <input
          type="text"
          {...register("url", { required: "URL is required" })}
          className="mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {errors.url && <p className="text-red-500">{errors.url.message}</p>}
      <div className="flex items-center space-x-4 mt-4">
        <label className="text-gray-700 w-1/4">Data URL:</label>
        <input
          type="text"
          {...register("dataURL", { required: "Data URL is required" })}
          onPaste={handlePaste}
          className="mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {errors.dataURL && (
        <p className="text-red-500">{errors.dataURL.message}</p>
      )}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : t("fetch")}
      </button>
    </form>
  );
}
