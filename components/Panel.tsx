import type { Database } from "@/types/supabase";
import { Center, Flex, SimpleGrid, Title, UnstyledButton } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { IconGridDots, IconList } from "@tabler/icons-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { setCookie } from "cookies-next";
import { useState } from "react";
import { Card } from "./Card/Card";

type Xlug = Database["public"]["Tables"]["xlugs"]["Row"];

interface PanelProps {
  xlugs?: Xlug[] | null;
  localXlugs?: Xlug[] | null;
  layout: "list" | "grid";
  updateXlugs: React.Dispatch<React.SetStateAction<Xlug[] | null | undefined>>;
}

export default function Panel({ xlugs, localXlugs, layout: initialLayout, updateXlugs }: PanelProps) {
  const [layout, setLayout] = useState(initialLayout);
  const [accountGridRef] = useAutoAnimate();
  const [localGridRef] = useAutoAnimate();

  const cols = layout === "grid" ? 4 : 1;
  const breakpoints =
    layout === "grid"
      ? [
          { cols: 1, maxWidth: "xs" },
          { cols: 2, maxWidth: "sm" },
          { cols: 3, maxWidth: "md" },
        ]
      : [];

  const update = (value: "list" | "grid") => {
    setCookie("data_layout", value);
    setLayout(value);
  };

  const list = (
    <Flex align="center" gap="xs">
      <UnstyledButton c="gray.9" onClick={() => update("list")}>
        <Center>
          <IconList />
        </Center>
      </UnstyledButton>
      <UnstyledButton c="gray.9" onClick={() => update("grid")}>
        <Center>
          <IconGridDots />
        </Center>
      </UnstyledButton>
    </Flex>
  );

  return (
    <ModalsProvider>
      {xlugs && xlugs.length > 0 && (
        <>
          <Flex w="100%" align="center" justify="flex-end">
            <Title order={2} w="100%" size={24}>
              Your account xlugs
            </Title>
            {list}
          </Flex>
          <SimpleGrid ref={accountGridRef} w="100%" cols={cols} breakpoints={breakpoints}>
            {xlugs.map((xlug) => (
              <Card key={xlug.id} layout={layout} data={xlug} actions={["copy", "edit", "delete"]} />
            ))}
          </SimpleGrid>
        </>
      )}
      {localXlugs && localXlugs.length > 0 && (
        <>
          <Flex w="100%" align="center" justify="flex-end">
            <Title order={2} w="100%" size={24}>
              Your local xlugs
            </Title>
            {list}
          </Flex>
          <SimpleGrid ref={localGridRef} w="100%" cols={cols} breakpoints={breakpoints}>
            {localXlugs.map((localXlug) => (
              <Card
                key={localXlug.id}
                layout={layout}
                data={localXlug}
                actions={["copy", "delete"]}
                actionDeleteProps={{
                  onDelete: () => updateXlugs((prev) => prev?.filter((xlug) => xlug.id !== localXlug.id) ?? []),
                }}
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </ModalsProvider>
  );
}
