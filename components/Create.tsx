import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Box } from "@mantine/core";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { type FormErrors, useForm, zodResolver } from "@mantine/form";
import axios, { type Response } from "redaxios";
import { toast } from "sonner";
import type { ZodSchema } from "zod";
import type { CreateXlug } from "@/types";

interface CreateProps {
  actionLabel: string;
  action: string;
  schema: ZodSchema<CreateXlug>;
  successMessage: string;
  initialValues: CreateXlug;
  buttonPosition?: "left" | "right";
  onFinish?: (res: Response<any>) => void;
  onUpdate?: (res: Response<any>) => void;
}

const onError = (errors: FormErrors) => {
  const key = Object.keys(errors)[0];
  toast.error(errors[key]);
};

export function Create({
  actionLabel,
  action,
  successMessage,
  schema,
  initialValues,
  buttonPosition = "left",
  onFinish,
  onUpdate,
}: CreateProps) {
  const router = useRouter();
  const session = useSession();
  const [submitting, setSubmitting] = useState(false);
  const { onSubmit, getInputProps } = useForm({
    initialValues,
    validate: zodResolver(schema),
  });

  const onValid = useCallback(
    async (values: typeof initialValues) => {
      if (submitting) return;
      setSubmitting(true);

      try {
        const res = await axios.post(action, values);
        if (!session) onUpdate?.(res);

        toast.success(successMessage);
        void router.push("/dashboard", undefined, { scroll: false });
        onFinish?.(res);
      } catch (error: any) {
        const message = typeof error.data === "string" ? error.data : error.data?.message;
        toast.error(message ?? "Something went wrong, try again");
      } finally {
        setSubmitting(false);
      }
    },
    [action, successMessage, onUpdate, onFinish, router, session, submitting]
  );

  return (
    <Box
      aria-disabled={submitting}
      onSubmit={onSubmit(onValid, onError)}
      component="form"
      sx={{ display: "grid", gap: 12 }}
    >
      <Input id="id" label="Custom Id" placeholder="xlug" {...getInputProps("xlug")} />
      <Input
        id="destination"
        label="Destination URL"
        placeholder="https://xlug.vercel.app"
        inputMode="url"
        {...getInputProps("destination")}
      />
      <Input textarea id="description" label="Description (optional)" {...getInputProps("description")} />
      <Button
        loading={submitting}
        disabled={submitting}
        h={32}
        type="submit"
        px="xl"
        py={6}
        w="fit-content"
        sx={{ justifySelf: buttonPosition === "left" ? "flex-start" : "flex-end" }}
      >
        {actionLabel}
      </Button>
    </Box>
  );
}
