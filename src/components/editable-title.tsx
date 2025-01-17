"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useOuterClick } from "@/hooks/use-outer-click";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditableTitleProps {
  title: string;
  onSave: (title: string) => Promise<any>;
  className?: string;
}

const EditableTitle: FC<EditableTitleProps> = ({
  title: initialTitle,
  onSave,
  className,
}) => {
  const router = useRouter();
  const [mode, setMode] = useState<"EDIT" | "DISPLAY">("DISPLAY");
  const [title, setTitle] = useState(initialTitle);

  const inputRef = useOuterClick<HTMLInputElement>(async () => {
    if (mode === "EDIT") {
      setMode("DISPLAY");
      if (title.trim() === "") return;

      await onSave(title);
      router.refresh();
    }
  });

  useEffect(() => {
    if (mode === "EDIT") {
      inputRef.current?.focus();
    }
  }, [mode, inputRef]);

  if (mode === "DISPLAY") {
    return (
      <Button
        tabIndex={-1}
        variant="ghost"
        className={cn("w-full justify-start px-2", className)}
        onClick={() => setMode("EDIT")}
      >
        {title}
      </Button>
    );
  }

  return (
    <Input
      ref={inputRef}
      placeholder="Enter list title"
      className={cn("w-full px-2", className)}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

export default EditableTitle;
