import type { Database } from "@/types/supabase";
import { Title } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Card } from "./Card/Card";

type Xlug = Database["public"]["Tables"]["xlugs"]["Row"];

interface PanelProps {
  xlugs?: Xlug[] | null;
  localXlugs?: Xlug[] | null;
  updateXlugs: React.Dispatch<React.SetStateAction<Xlug[] | null | undefined>>;
}

export default function Panel({ xlugs, localXlugs, updateXlugs }: PanelProps) {
  return (
    <ModalsProvider>
      {xlugs && xlugs.length > 0 && (
        <>
          <Title w="100%" size={24}>
            Your account xlugs
          </Title>
          {xlugs.map((xlug) => (
            <Card key={xlug.id} data={xlug} actions={["copy", "edit", "delete"]} />
          ))}
        </>
      )}
      {localXlugs && localXlugs.length > 0 && (
        <>
          <Title w="100%" size={24}>
            Your local xlugs
          </Title>
          {localXlugs.map((localXlug) => (
            <Card
              key={localXlug.id}
              data={localXlug}
              actions={["copy", "delete"]}
              actionDeleteProps={{
                onDelete: () => updateXlugs((prev) => prev?.filter((xlug) => xlug.id !== localXlug.id) ?? []),
              }}
            />
          ))}
        </>
      )}
    </ModalsProvider>
  );
}
