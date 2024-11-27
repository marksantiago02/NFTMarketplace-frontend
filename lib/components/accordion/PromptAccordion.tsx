import { Accordion, AccordionItem } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function PromptAccordion({ text }: { text: string }) {
  return (
    <Accordion
      fullWidth
      keepContentMounted
      className="gap-3 px-0"
      itemClasses={{
        base: "!bg-white/10",
        title: "font-medium",
        trigger: "py-4 md:py-6",
        content: "pt-0 pb-6 text-base text-default-500",
        indicator: "data-[open=true]:rotate-180",
      }}
      selectionMode="multiple"
      variant="splitted"
    >
      <AccordionItem
        key={0}
        indicator={<Icon icon="solar:alt-arrow-down-linear" width={24} />}
        title="Prompt"
      >
        {text}
      </AccordionItem>
    </Accordion>
  );
}
