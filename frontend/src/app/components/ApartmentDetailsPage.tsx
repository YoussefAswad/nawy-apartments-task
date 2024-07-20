import { Apartment } from "@/types/Apartment.type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { IoIosExpand } from "react-icons/io";
import { LuBedDouble } from "react-icons/lu";
import { LuBath } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { CgDetailsMore } from "react-icons/cg";
import { IoCall } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { ScrollArea } from "@/components/ui/scroll-area";

type ApartmentDetailsPageProps = {
  id: number;
};

export default function ApartmentDetailsPage({
  id,
}: ApartmentDetailsPageProps) {
  const { data, error, isPending } = useQuery({
    queryKey: ["apartment", id],
    queryFn: () => getApartmentDetails(id),
  });

  if (isPending) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <span className="text-2xl text-gray-500 animate-pulse">Loading</span>
      </div>
    );
  }

  return (
    <ScrollArea className="w-full h-[600px]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col space-y-1.5">
          <div className="text-2xl font-semibold tracking-tight leading-none">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: data?.currency,
            }).format(data?.price ?? 0)}
          </div>
          <div className="overflow-hidden text-lg text-muted-foreground overflow-ellipsis text-nowrap">
            {data?.title}
          </div>
        </div>
        <div className="pt-0">
          <div className="relative w-full h-48">
            <div style={{ borderRadius: "20px", overflow: "hidden" }}>
              <Image
                src={`https://picsum.photos/500`}
                layout="fill"
                objectFit="cover"
                alt={data?.title ?? "Apartment"}
              />
            </div>
          </div>
          <div className="mt-4">
            {" "}
            <div className="flex items-center space-x-2">
              <MdOutlineLocationOn />
              <span>{data?.location}</span>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <LuBedDouble />
              <span>
                {data?.bed_rooms}{" "}
                {(data?.bath_rooms ?? 0) > 1 ? "rooms" : "room"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <LuBath />
              <span>{data?.bath_rooms} bathroom</span>
            </div>
            <div className="flex items-center space-x-2">
              <IoIosExpand />
              <span>{data?.area} m²</span>
            </div>
          </div>
          <div className="flex items-center mt-2 space-x-2">
            <FaRegBuilding />
            <span>floor {data?.floor} </span>
          </div>
          <div className="flex flex-col gap-4 mt-5">
            <span className="text-2xl">Description</span>
            <p className="text-lg text-muted-foreground">
              {data?.details.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-2xl">Contact</span>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <IoMdContact />
              <span>{data?.details.contact_person}</span>
            </div>
            <div className="flex gap-2 items-center">
              <IoCall />
              <span>{data?.details.contact_phone}</span>
            </div>
            {data?.details.contact_email && (
              <div className="flex gap-2 items-center">
                <MdEmail />
                <span>{data?.details.contact_email}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

async function getApartmentDetails(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/apartments/${id}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<Apartment>;
}
