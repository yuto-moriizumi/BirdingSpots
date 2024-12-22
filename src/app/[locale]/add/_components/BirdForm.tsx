import { useState } from "react";
import { getBird } from "../_util/getBird";
import { Bird } from "@/model/Bird";
import { Button } from "@/app/[locale]/_components/Button";
import { useTranslations } from "next-intl";

interface Props {
  onData: (bird: Bird) => void;
}

export function BirdForm(props: Props) {
  const [id, setId] = useState<number | undefined>(undefined);
  const t = useTranslations("AddSpotPage");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (id !== undefined) {
      const bird = await getBird(id);
      if (bird) props.onData(bird);
    }
  };

  return (
    <div onSubmit={handleSubmit}>
      <label>
        Bird ID:
        <input
          type="number"
          value={id ?? ""}
          onChange={(e) => setId(Number(e.target.value))}
        />
      </label>
      <Button type="submit">{t("addBird")}</Button>
    </div>
  );
}
