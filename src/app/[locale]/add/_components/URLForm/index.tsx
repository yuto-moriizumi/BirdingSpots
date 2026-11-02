"use client";

import { getSpotData } from "./getSpotData";
import { Spot } from "@/model/Spot";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

const schema = z.object({
  url: z.string().url(),
});
type Schema = z.infer<typeof schema>;
type URLFormSpotData = Omit<Spot, "updatedAt" | "heatIndexId"> & {
  heatIndexId: string;
};

/** 探鳥地のURLからフォーム入力を補助するコンポーネント */
export function URLForm(props: { onData: (data: URLFormSpotData) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const t = useTranslations("AddSpotPage");

  const onSubmit = async (data: { url: string }) => {
    try {
      const idMatch = data.url.match(/\/(\d+)\/?$/);
      const id = idMatch ? idMatch[1] : "1";
      const spotData = await getSpotData(id);
      props.onData({ id, ...spotData });
      reset();
    } catch (error) {
      console.error("Validation or fetching error:", error);
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
