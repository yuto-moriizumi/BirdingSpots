"use client";

import { useState } from "react"; // Import useState
import { RefreshCw } from "lucide-react";
import { CardHeader } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { Spot } from "@/model/Spot";
import { useTranslations } from "next-intl";
import { Month } from "@/model/Month";
import { updateSpot } from "./updateSpot";

export function SpotCardHeader({
  spot,
  currentMonth,
}: {
  spot: Spot;
  currentMonth: Month;
}) {
  const t = useTranslations("Home");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleUpdate = async (spotId: string) => {
    setIsLoading(true); // Set loading to true
    try {
      await updateSpot(spotId); // Await the promise
    } catch (error) {
      console.error("Failed to update spot:", error); // Optional: handle error
    } finally {
      setIsLoading(false); // Set loading to false in finally block
    }
  };

  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
      <div>
        <div className="flex items-center flex-wrap gap-x-2">
          <h2 className="text-lg font-semibold">
            <Link href={`https://zoopicker.com/places/${spot.id}`}>
              {spot.name}
            </Link>
          </h2>
          <p className="text-sm text-gray-500">
            {t("popularity")}: {spot[currentMonth]}
          </p>
        </div>
        <p className="text-sm text-gray-500">{spot.address}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleUpdate(spot.id)}
          className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" // Add disabled styles
          disabled={isLoading} // Disable button when loading
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />{" "}
        </button>
      </div>
    </CardHeader>
  );
}
