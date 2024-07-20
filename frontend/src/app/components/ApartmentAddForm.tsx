import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApartmentCreate as formSchema } from "@/types/Apartment.type";
import { VscLoading } from "react-icons/vsc";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CurrencyCode } from "@/enums/CurrencyCode.enum";
import { ScrollArea } from "@/components/ui/scroll-area";
// const formSchema = z.object({
//   title: z.string().min(1).max(255),
//   price: z.coerce.number().gte(1).lte(9999),
//   currency: z.string(),
//   area: z.number(),
//   bed_rooms: z.number(),
//   bath_rooms: z.number(),
//   floor: z.number(),
//   location: z.string(),
//   contact_person: z.string().min(1).max(255),
//   contact_email: z.string().email().min(1).max(255).optional(),
//   contact_phone: z.string().min(1).max(255),
//   description: z.string().min(1).max(255),
// });

const enumToObjectList = (enumObj: any) => {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key))) // Filter out numeric values (in case of numeric enums)
    .map((key) => ({
      label: key,
      value: enumObj[key as keyof typeof enumObj],
    }));
};

type ApartmentAddFromProps = {
  onFormSubmit: (data: z.infer<typeof formSchema>) => void;
  isPending?: boolean;
};

export function ApartmentAddFrom({
  onFormSubmit,
  isPending,
}: ApartmentAddFromProps) {
  const CurrencyCodeList = enumToObjectList(CurrencyCode);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 1,
      area: 1,
      currency: CurrencyCode.EGP,
      bed_rooms: 1,
      bath_rooms: 1,
      floor: 1,
      location: "",
      contact_person: "",
      contact_phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onFormSubmit(values);
  }

  console.log(form.getValues());
  console.log(form.formState.errors);

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-2 w-full"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ScrollArea className="w-full h-[600px]">
            <div className="flex flex-col mb-3 space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="flex flex-col mx-1">
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          CurrencyCodeList?.find(
                            (item) => item.value === field.value,
                          )?.value ?? CurrencyCode.EGP
                        }
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {CurrencyCodeList?.map((item) => (
                            <SelectItem
                              value={item.label}
                              key={item.value}
                              onSelect={() => {
                                form.setValue("currency", item.value);
                              }}
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bed_rooms"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>No. Bedrooms</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bath_rooms"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>No. Bathrooms</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Floor</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-5">
                <span className="text-lg font-semibold">Contact Details</span>
              </div>
              <FormField
                control={form.control}
                name="contact_person"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_email"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_phone"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ScrollArea>
          <Button disabled={isPending} className="w-full" type="submit">
            {isPending ? <VscLoading className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
