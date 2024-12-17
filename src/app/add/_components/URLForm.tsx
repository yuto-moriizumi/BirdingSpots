"use client";

import { getSpotData } from "../_util/getSpotData";
import { Spot } from "@/model/Spot";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: { url: string; dataURL: string }) => {
    try {
      const spotData = await getSpotData(data.url, data.dataURL);
      const idMatch = data.url.match(/\/(\d+)\/?$/);
      const id = idMatch ? idMatch[1] : "1";
      props.onData({ id, ...spotData });
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
      <label className="block">
        <span className="text-gray-700">URL:</span>
        <input
          type="text"
          {...register("url", { required: "URL is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.url && <p className="text-red-500">{errors.url.message}</p>}
      </label>
      <label className="block">
        <span className="text-gray-700">Data URL:</span>
        <input
          type="text"
          {...register("dataURL", { required: "Data URL is required" })}
          onPaste={handlePaste}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.dataURL && (
          <p className="text-red-500">{errors.dataURL.message}</p>
        )}
      </label>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Fetch Data"}
      </button>
    </form>
  );
}
